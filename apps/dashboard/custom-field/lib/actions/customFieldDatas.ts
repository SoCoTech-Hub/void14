"use server";

import { revalidatePath } from "next/cache";
import {
  createCustomFieldData,
  deleteCustomFieldData,
  updateCustomFieldData,
} from "@/lib/api/customFieldDatas/mutations";
import {
  CustomFieldDataId,
  NewCustomFieldDataParams,
  UpdateCustomFieldDataParams,
  customFieldDataIdSchema,
  insertCustomFieldDataParams,
  updateCustomFieldDataParams,
} from "@/lib/db/schema/customFieldDatas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCustomFieldDatas = () => revalidatePath("/custom-field-datas");

export const createCustomFieldDataAction = async (input: NewCustomFieldDataParams) => {
  try {
    const payload = insertCustomFieldDataParams.parse(input);
    await createCustomFieldData(payload);
    revalidateCustomFieldDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCustomFieldDataAction = async (input: UpdateCustomFieldDataParams) => {
  try {
    const payload = updateCustomFieldDataParams.parse(input);
    await updateCustomFieldData(payload.id, payload);
    revalidateCustomFieldDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCustomFieldDataAction = async (input: CustomFieldDataId) => {
  try {
    const payload = customFieldDataIdSchema.parse({ id: input });
    await deleteCustomFieldData(payload.id);
    revalidateCustomFieldDatas();
  } catch (e) {
    return handleErrors(e);
  }
};
