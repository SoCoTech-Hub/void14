"use server";

import { revalidatePath } from "next/cache";
import {
  createLogstoreStandardLog,
  deleteLogstoreStandardLog,
  updateLogstoreStandardLog,
} from "@/lib/api/logstoreStandardLogs/mutations";
import {
  LogstoreStandardLogId,
  NewLogstoreStandardLogParams,
  UpdateLogstoreStandardLogParams,
  logstoreStandardLogIdSchema,
  insertLogstoreStandardLogParams,
  updateLogstoreStandardLogParams,
} from "@/lib/db/schema/logstoreStandardLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLogstoreStandardLogs = () => revalidatePath("/logstore-standard-logs");

export const createLogstoreStandardLogAction = async (input: NewLogstoreStandardLogParams) => {
  try {
    const payload = insertLogstoreStandardLogParams.parse(input);
    await createLogstoreStandardLog(payload);
    revalidateLogstoreStandardLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLogstoreStandardLogAction = async (input: UpdateLogstoreStandardLogParams) => {
  try {
    const payload = updateLogstoreStandardLogParams.parse(input);
    await updateLogstoreStandardLog(payload.id, payload);
    revalidateLogstoreStandardLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLogstoreStandardLogAction = async (input: LogstoreStandardLogId) => {
  try {
    const payload = logstoreStandardLogIdSchema.parse({ id: input });
    await deleteLogstoreStandardLog(payload.id);
    revalidateLogstoreStandardLogs();
  } catch (e) {
    return handleErrors(e);
  }
};