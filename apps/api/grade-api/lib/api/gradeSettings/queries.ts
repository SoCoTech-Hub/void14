import { eq } from "drizzle-orm";

import type { GradeSettingId } from "../db/schema/gradeSettings";
import { db } from "../db/index";
import {
  gradeSettingIdSchema,
  gradeSettings,
} from "../db/schema/gradeSettings";

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
