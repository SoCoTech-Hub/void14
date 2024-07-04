"use server";

import { revalidatePath } from "next/cache";

import {
  createCustomFieldCategory,
  deleteCustomFieldCategory,
  updateCustomFieldCategory,
} from "../api/customFieldCategories/mutations";
import {
  CustomFieldCategoryId,
  customFieldCategoryIdSchema,
  insertCustomFieldCategoryParams,
  NewCustomFieldCategoryParams,
  UpdateCustomFieldCategoryParams,
  updateCustomFieldCategoryParams,
} from "../db/schema/customFieldCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCustomFieldCategories = () =>
  revalidatePath("/custom-field-categories");

export const createCustomFieldCategoryAction = async (
  input: NewCustomFieldCategoryParams,
) => {
  try {
    const payload = insertCustomFieldCategoryParams.parse(input);
    await createCustomFieldCategory(payload);
    revalidateCustomFieldCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCustomFieldCategoryAction = async (
  input: UpdateCustomFieldCategoryParams,
) => {
  try {
    const payload = updateCustomFieldCategoryParams.parse(input);
    await updateCustomFieldCategory(payload.id, payload);
    revalidateCustomFieldCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCustomFieldCategoryAction = async (
  input: CustomFieldCategoryId,
) => {
  try {
    const payload = customFieldCategoryIdSchema.parse({ id: input });
    await deleteCustomFieldCategory(payload.id);
    revalidateCustomFieldCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
