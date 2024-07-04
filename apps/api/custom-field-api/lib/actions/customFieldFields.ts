"use server";

import { revalidatePath } from "next/cache";

import {
  createCustomFieldField,
  deleteCustomFieldField,
  updateCustomFieldField,
} from "../api/customFieldFields/mutations";
import {
  CustomFieldFieldId,
  customFieldFieldIdSchema,
  insertCustomFieldFieldParams,
  NewCustomFieldFieldParams,
  UpdateCustomFieldFieldParams,
  updateCustomFieldFieldParams,
} from "../db/schema/customFieldFields";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCustomFieldFields = () =>
  revalidatePath("/custom-field-fields");

export const createCustomFieldFieldAction = async (
  input: NewCustomFieldFieldParams,
) => {
  try {
    const payload = insertCustomFieldFieldParams.parse(input);
    await createCustomFieldField(payload);
    revalidateCustomFieldFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCustomFieldFieldAction = async (
  input: UpdateCustomFieldFieldParams,
) => {
  try {
    const payload = updateCustomFieldFieldParams.parse(input);
    await updateCustomFieldField(payload.id, payload);
    revalidateCustomFieldFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCustomFieldFieldAction = async (
  input: CustomFieldFieldId,
) => {
  try {
    const payload = customFieldFieldIdSchema.parse({ id: input });
    await deleteCustomFieldField(payload.id);
    revalidateCustomFieldFields();
  } catch (e) {
    return handleErrors(e);
  }
};
