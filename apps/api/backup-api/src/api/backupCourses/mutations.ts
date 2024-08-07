import type {
  BackupCourseId,
  NewBackupCourseParams,
  UpdateBackupCourseParams,
} from "@soco/backup-db/schema/backupCourses";
import { eq } from "@soco/backup-db";
import { db } from "@soco/backup-db/client";
import {
  backupCourseIdSchema,
  backupCourses,
  insertBackupCourseSchema,
  updateBackupCourseSchema,
} from "@soco/backup-db/schema/backupCourses";

export const createBackupCourse = async (
  backupCourse: NewBackupCourseParams,
) => {
  const newBackupCourse = insertBackupCourseSchema.parse(backupCourse);
  try {
    const [b] = await db
      .insert(backupCourses)
      .values(newBackupCourse)
      .returning();
    return { backupCourse: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBackupCourse = async (
  id: BackupCourseId,
  backupCourse: UpdateBackupCourseParams,
) => {
  const { id: backupCourseId } = backupCourseIdSchema.parse({ id });
  const newBackupCourse = updateBackupCourseSchema.parse(backupCourse);
  try {
    const [b] = await db
      .update(backupCourses)
      .set({ ...newBackupCourse, updatedAt: new Date() })
      .where(eq(backupCourses.id, backupCourseId!))
      .returning();
    return { backupCourse: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBackupCourse = async (id: BackupCourseId) => {
  const { id: backupCourseId } = backupCourseIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(backupCourses)
      .where(eq(backupCourses.id, backupCourseId!))
      .returning();
    return { backupCourse: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
