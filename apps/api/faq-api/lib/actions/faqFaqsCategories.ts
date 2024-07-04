"use server";

import { revalidatePath } from "next/cache";

import {
  createFaqFaqsCategory,
  deleteFaqFaqsCategory,
  updateFaqFaqsCategory,
} from "../api/faqFaqsCategories/mutations";
import {
  FaqFaqsCategoryId,
  faqFaqsCategoryIdSchema,
  insertFaqFaqsCategoryParams,
  NewFaqFaqsCategoryParams,
  UpdateFaqFaqsCategoryParams,
  updateFaqFaqsCategoryParams,
} from "../db/schema/faqFaqsCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFaqFaqsCategories = () =>
  revalidatePath("/faq-faqs-categories");

export const createFaqFaqsCategoryAction = async (
  input: NewFaqFaqsCategoryParams,
) => {
  try {
    const payload = insertFaqFaqsCategoryParams.parse(input);
    await createFaqFaqsCategory(payload);
    revalidateFaqFaqsCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFaqFaqsCategoryAction = async (
  input: UpdateFaqFaqsCategoryParams,
) => {
  try {
    const payload = updateFaqFaqsCategoryParams.parse(input);
    await updateFaqFaqsCategory(payload.id, payload);
    revalidateFaqFaqsCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFaqFaqsCategoryAction = async (input: FaqFaqsCategoryId) => {
  try {
    const payload = faqFaqsCategoryIdSchema.parse({ id: input });
    await deleteFaqFaqsCategory(payload.id);
    revalidateFaqFaqsCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
