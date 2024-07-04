"use server";

import { revalidatePath } from "next/cache";

import { createFaq, deleteFaq, updateFaq } from "../api/faqs/mutations";
import {
  FaqId,
  faqIdSchema,
  insertFaqParams,
  NewFaqParams,
  UpdateFaqParams,
  updateFaqParams,
} from "../db/schema/faqs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFaqs = () => revalidatePath("/faqs");

export const createFaqAction = async (input: NewFaqParams) => {
  try {
    const payload = insertFaqParams.parse(input);
    await createFaq(payload);
    revalidateFaqs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFaqAction = async (input: UpdateFaqParams) => {
  try {
    const payload = updateFaqParams.parse(input);
    await updateFaq(payload.id, payload);
    revalidateFaqs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFaqAction = async (input: FaqId) => {
  try {
    const payload = faqIdSchema.parse({ id: input });
    await deleteFaq(payload.id);
    revalidateFaqs();
  } catch (e) {
    return handleErrors(e);
  }
};
