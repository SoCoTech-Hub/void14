"use server";

import { revalidatePath } from "next/cache";
import {
  createApplicationCategory,
  deleteApplicationCategory,
  updateApplicationCategory,
} from "@/lib/api/applicationCategories/mutations";
import {
  ApplicationCategoryId,
  NewApplicationCategoryParams,
  UpdateApplicationCategoryParams,
  applicationCategoryIdSchema,
  insertApplicationCategoryParams,
  updateApplicationCategoryParams,
} from "@/lib/db/schema/applicationCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateApplicationCategories = () => revalidatePath("/application-categories");

export const createApplicationCategoryAction = async (input: NewApplicationCategoryParams) => {
  try {
    const payload = insertApplicationCategoryParams.parse(input);
    await createApplicationCategory(payload);
    revalidateApplicationCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateApplicationCategoryAction = async (input: UpdateApplicationCategoryParams) => {
  try {
    const payload = updateApplicationCategoryParams.parse(input);
    await updateApplicationCategory(payload.id, payload);
    revalidateApplicationCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteApplicationCategoryAction = async (input: ApplicationCategoryId) => {
  try {
    const payload = applicationCategoryIdSchema.parse({ id: input });
    await deleteApplicationCategory(payload.id);
    revalidateApplicationCategories();
  } catch (e) {
    return handleErrors(e);
  }
};