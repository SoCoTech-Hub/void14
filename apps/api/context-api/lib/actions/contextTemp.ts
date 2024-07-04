"use server";

import { revalidatePath } from "next/cache";

import {
  createContextTemp,
  deleteContextTemp,
  updateContextTemp,
} from "../api/contextTemp/mutations";
import {
  ContextTempId,
  contextTempIdSchema,
  insertContextTempParams,
  NewContextTempParams,
  UpdateContextTempParams,
  updateContextTempParams,
} from "../db/schema/contextTemp";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateContextTemps = () => revalidatePath("/context-temp");

export const createContextTempAction = async (input: NewContextTempParams) => {
  try {
    const payload = insertContextTempParams.parse(input);
    await createContextTemp(payload);
    revalidateContextTemps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateContextTempAction = async (
  input: UpdateContextTempParams,
) => {
  try {
    const payload = updateContextTempParams.parse(input);
    await updateContextTemp(payload.id, payload);
    revalidateContextTemps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteContextTempAction = async (input: ContextTempId) => {
  try {
    const payload = contextTempIdSchema.parse({ id: input });
    await deleteContextTemp(payload.id);
    revalidateContextTemps();
  } catch (e) {
    return handleErrors(e);
  }
};
