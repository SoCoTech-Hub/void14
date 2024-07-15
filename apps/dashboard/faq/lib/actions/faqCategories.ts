"use server";

import { revalidatePath } from "next/cache";
import {
  createFaqCategory,
  deleteFaqCategory,
  updateFaqCategory,
} from "@/lib/api/faqCategories/mutations";
import {
  FaqCategoryId,
  NewFaqCategoryParams,
  UpdateFaqCategoryParams,
  faqCategoryIdSchema,
  insertFaqCategoryParams,
  updateFaqCategoryParams,
} from "@/lib/db/schema/faqCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFaqCategories = () => revalidatePath("/faq-categories");

export const createFaqCategoryAction = async (input: NewFaqCategoryParams) => {
  try {
    const payload = insertFaqCategoryParams.parse(input);
    await createFaqCategory(payload);
    revalidateFaqCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFaqCategoryAction = async (input: UpdateFaqCategoryParams) => {
  try {
    const payload = updateFaqCategoryParams.parse(input);
    await updateFaqCategory(payload.id, payload);
    revalidateFaqCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFaqCategoryAction = async (input: FaqCategoryId) => {
  try {
    const payload = faqCategoryIdSchema.parse({ id: input });
    await deleteFaqCategory(payload.id);
    revalidateFaqCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
