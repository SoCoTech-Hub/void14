"use server";

import { revalidatePath } from "next/cache";
import {
  createBursaryCategory,
  deleteBursaryCategory,
  updateBursaryCategory,
} from "@/lib/api/bursaryCategories/mutations";
import {
  BursaryCategoryId,
  NewBursaryCategoryParams,
  UpdateBursaryCategoryParams,
  bursaryCategoryIdSchema,
  insertBursaryCategoryParams,
  updateBursaryCategoryParams,
} from "@/lib/db/schema/bursaryCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBursaryCategories = () => revalidatePath("/bursary-categories");

export const createBursaryCategoryAction = async (input: NewBursaryCategoryParams) => {
  try {
    const payload = insertBursaryCategoryParams.parse(input);
    await createBursaryCategory(payload);
    revalidateBursaryCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBursaryCategoryAction = async (input: UpdateBursaryCategoryParams) => {
  try {
    const payload = updateBursaryCategoryParams.parse(input);
    await updateBursaryCategory(payload.id, payload);
    revalidateBursaryCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBursaryCategoryAction = async (input: BursaryCategoryId) => {
  try {
    const payload = bursaryCategoryIdSchema.parse({ id: input });
    await deleteBursaryCategory(payload.id);
    revalidateBursaryCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
