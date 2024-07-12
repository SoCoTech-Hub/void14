import type { BackupCourseId } from "@soco/backup-db/schema/backupCourses";
import { eq } from "@soco/backup-db";
import { db } from "@soco/backup-db/client";
import {
  backupCourseIdSchema,
  backupCourses,
} from "@soco/backup-db/schema/backupCourses";

export const getBackupCourses = async () => {
  const rows = await db.select().from(backupCourses);
  const b = rows;
  return { backupCourses: b };
};

export const getBackupCourseById = async (id: BackupCourseId) => {
  const { id: backupCourseId } = backupCourseIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(backupCourses)
    .where(eq(backupCourses.id, backupCourseId));
  if (row === undefined) return {};
  const b = row;
  return { backupCourse: b };
};
