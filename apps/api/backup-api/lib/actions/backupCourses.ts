"use server";

import { revalidatePath } from "next/cache";

import {
  createBackupCourse,
  deleteBackupCourse,
  updateBackupCourse,
} from "../api/backupCourses/mutations";
import {
  BackupCourseId,
  backupCourseIdSchema,
  insertBackupCourseParams,
  NewBackupCourseParams,
  UpdateBackupCourseParams,
  updateBackupCourseParams,
} from "../db/schema/backupCourses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBackupCourses = () => revalidatePath("/backup-courses");

export const createBackupCourseAction = async (
  input: NewBackupCourseParams,
) => {
  try {
    const payload = insertBackupCourseParams.parse(input);
    await createBackupCourse(payload);
    revalidateBackupCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBackupCourseAction = async (
  input: UpdateBackupCourseParams,
) => {
  try {
    const payload = updateBackupCourseParams.parse(input);
    await updateBackupCourse(payload.id, payload);
    revalidateBackupCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBackupCourseAction = async (input: BackupCourseId) => {
  try {
    const payload = backupCourseIdSchema.parse({ id: input });
    await deleteBackupCourse(payload.id);
    revalidateBackupCourses();
  } catch (e) {
    return handleErrors(e);
  }
};
