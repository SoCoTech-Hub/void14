"use server";

import { revalidatePath } from "next/cache";

import {
  createDataContent,
  deleteDataContent,
  updateDataContent,
} from "../api/dataContents/mutations";
import {
  DataContentId,
  dataContentIdSchema,
  insertDataContentParams,
  NewDataContentParams,
  UpdateDataContentParams,
  updateDataContentParams,
} from "../db/schema/dataContents";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDataContents = () => revalidatePath("/data-contents");

export const createDataContentAction = async (input: NewDataContentParams) => {
  try {
    const payload = insertDataContentParams.parse(input);
    await createDataContent(payload);
    revalidateDataContents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDataContentAction = async (
  input: UpdateDataContentParams,
) => {
  try {
    const payload = updateDataContentParams.parse(input);
    await updateDataContent(payload.id, payload);
    revalidateDataContents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDataContentAction = async (input: DataContentId) => {
  try {
    const payload = dataContentIdSchema.parse({ id: input });
    await deleteDataContent(payload.id);
    revalidateDataContents();
  } catch (e) {
    return handleErrors(e);
  }
};
