"use server";

import { revalidatePath } from "next/cache";

import {
  createConfigLog,
  deleteConfigLog,
  updateConfigLog,
} from "../api/configLogs/mutations";
import {
  ConfigLogId,
  configLogIdSchema,
  insertConfigLogParams,
  NewConfigLogParams,
  UpdateConfigLogParams,
  updateConfigLogParams,
} from "../db/schema/configLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateConfigLogs = () => revalidatePath("/config-logs");

export const createConfigLogAction = async (input: NewConfigLogParams) => {
  try {
    const payload = insertConfigLogParams.parse(input);
    await createConfigLog(payload);
    revalidateConfigLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateConfigLogAction = async (input: UpdateConfigLogParams) => {
  try {
    const payload = updateConfigLogParams.parse(input);
    await updateConfigLog(payload.id, payload);
    revalidateConfigLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteConfigLogAction = async (input: ConfigLogId) => {
  try {
    const payload = configLogIdSchema.parse({ id: input });
    await deleteConfigLog(payload.id);
    revalidateConfigLogs();
  } catch (e) {
    return handleErrors(e);
  }
};
