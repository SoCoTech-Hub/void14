"use server";

import { revalidatePath } from "next/cache";
import {
  createBackupLog,
  deleteBackupLog,
  updateBackupLog,
} from "@/lib/api/backupLogs/mutations";
import {
  BackupLogId,
  NewBackupLogParams,
  UpdateBackupLogParams,
  backupLogIdSchema,
  insertBackupLogParams,
  updateBackupLogParams,
} from "@/lib/db/schema/backupLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBackupLogs = () => revalidatePath("/backup-logs");

export const createBackupLogAction = async (input: NewBackupLogParams) => {
  try {
    const payload = insertBackupLogParams.parse(input);
    await createBackupLog(payload);
    revalidateBackupLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBackupLogAction = async (input: UpdateBackupLogParams) => {
  try {
    const payload = updateBackupLogParams.parse(input);
    await updateBackupLog(payload.id, payload);
    revalidateBackupLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBackupLogAction = async (input: BackupLogId) => {
  try {
    const payload = backupLogIdSchema.parse({ id: input });
    await deleteBackupLog(payload.id);
    revalidateBackupLogs();
  } catch (e) {
    return handleErrors(e);
  }
};