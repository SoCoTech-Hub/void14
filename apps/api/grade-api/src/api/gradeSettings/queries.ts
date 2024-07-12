import type { GradeSettingId } from "@soco/grade-db/schema/gradeSettings";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeSettingIdSchema,
  gradeSettings,
} from "@soco/grade-db/schema/gradeSettings";

export const getGradeSettings = async () => {
  const rows = await db.select().from(gradeSettings);
  const g = rows;
  return { gradeSettings: g };
};

export const getGradeSettingById = async (id: GradeSettingId) => {
  const { id: gradeSettingId } = gradeSettingIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradeSettings)
    .where(eq(gradeSettings.id, gradeSettingId));
  if (row === undefined) return {};
  const g = row;
  return { gradeSetting: g };
};
