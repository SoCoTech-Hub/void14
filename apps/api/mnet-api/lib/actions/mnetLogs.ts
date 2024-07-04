"use server";

import { revalidatePath } from "next/cache";

import {
  createMnetLog,
  deleteMnetLog,
  updateMnetLog,
} from "../api/mnetLogs/mutations";
import {
  insertMnetLogParams,
  MnetLogId,
  mnetLogIdSchema,
  NewMnetLogParams,
  UpdateMnetLogParams,
  updateMnetLogParams,
} from "../db/schema/mnetLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetLogs = () => revalidatePath("/mnet-logs");

export const createMnetLogAction = async (input: NewMnetLogParams) => {
  try {
    const payload = insertMnetLogParams.parse(input);
    await createMnetLog(payload);
    revalidateMnetLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetLogAction = async (input: UpdateMnetLogParams) => {
  try {
    const payload = updateMnetLogParams.parse(input);
    await updateMnetLog(payload.id, payload);
    revalidateMnetLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetLogAction = async (input: MnetLogId) => {
  try {
    const payload = mnetLogIdSchema.parse({ id: input });
    await deleteMnetLog(payload.id);
    revalidateMnetLogs();
  } catch (e) {
    return handleErrors(e);
  }
};
