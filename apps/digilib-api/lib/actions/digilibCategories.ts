"use server";

import { revalidatePath } from "next/cache";
import {
  createDigilibCategory,
  deleteDigilibCategory,
  updateDigilibCategory,
} from "@/lib/api/digilibCategories/mutations";
import {
  DigilibCategoryId,
  NewDigilibCategoryParams,
  UpdateDigilibCategoryParams,
  digilibCategoryIdSchema,
  insertDigilibCategoryParams,
  updateDigilibCategoryParams,
} from "@/lib/db/schema/digilibCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDigilibCategories = () => revalidatePath("/digilib-categories");

export const createDigilibCategoryAction = async (input: NewDigilibCategoryParams) => {
  try {
    const payload = insertDigilibCategoryParams.parse(input);
    await createDigilibCategory(payload);
    revalidateDigilibCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDigilibCategoryAction = async (input: UpdateDigilibCategoryParams) => {
  try {
    const payload = updateDigilibCategoryParams.parse(input);
    await updateDigilibCategory(payload.id, payload);
    revalidateDigilibCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDigilibCategoryAction = async (input: DigilibCategoryId) => {
  try {
    const payload = digilibCategoryIdSchema.parse({ id: input });
    await deleteDigilibCategory(payload.id);
    revalidateDigilibCategories();
  } catch (e) {
    return handleErrors(e);
  }
};