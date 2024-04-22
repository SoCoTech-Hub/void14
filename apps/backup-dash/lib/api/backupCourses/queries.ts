import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BackupCourseId, backupCourseIdSchema, backupCourses } from "@/lib/db/schema/backupCourses";

export const getBackupCourses = async () => {
  const rows = await db.select().from(backupCourses);
  const b = rows
  return { backupCourses: b };
};

export const getBackupCourseById = async (id: BackupCourseId) => {
  const { id: backupCourseId } = backupCourseIdSchema.parse({ id });
  const [row] = await db.select().from(backupCourses).where(eq(backupCourses.id, backupCourseId));
  if (row === undefined) return {};
  const b = row;
  return { backupCourse: b };
};


