"use server";

import { revalidatePath } from "next/cache";

import { createField, deleteField, updateField } from "../api/fields/mutations";
import {
  FieldId,
  fieldIdSchema,
  insertFieldParams,
  NewFieldParams,
  UpdateFieldParams,
  updateFieldParams,
} from "../db/schema/fields";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFields = () => revalidatePath("/fields");

export const createFieldAction = async (input: NewFieldParams) => {
  try {
    const payload = insertFieldParams.parse(input);
    await createField(payload);
    revalidateFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFieldAction = async (input: UpdateFieldParams) => {
  try {
    const payload = updateFieldParams.parse(input);
    await updateField(payload.id, payload);
    revalidateFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFieldAction = async (input: FieldId) => {
  try {
    const payload = fieldIdSchema.parse({ id: input });
    await deleteField(payload.id);
    revalidateFields();
  } catch (e) {
    return handleErrors(e);
  }
};
