"use server";

import { revalidatePath } from "next/cache";

import {
  createBackupController,
  deleteBackupController,
  updateBackupController,
} from "../api/backupControllers/mutations";
import {
  BackupControllerId,
  backupControllerIdSchema,
  insertBackupControllerParams,
  NewBackupControllerParams,
  UpdateBackupControllerParams,
  updateBackupControllerParams,
} from "../db/schema/backupControllers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBackupControllers = () => revalidatePath("/backup-controllers");

export const createBackupControllerAction = async (
  input: NewBackupControllerParams,
) => {
  try {
    const payload = insertBackupControllerParams.parse(input);
    await createBackupController(payload);
    revalidateBackupControllers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBackupControllerAction = async (
  input: UpdateBackupControllerParams,
) => {
  try {
    const payload = updateBackupControllerParams.parse(input);
    await updateBackupController(payload.id, payload);
    revalidateBackupControllers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBackupControllerAction = async (
  input: BackupControllerId,
) => {
  try {
    const payload = backupControllerIdSchema.parse({ id: input });
    await deleteBackupController(payload.id);
    revalidateBackupControllers();
  } catch (e) {
    return handleErrors(e);
  }
};
