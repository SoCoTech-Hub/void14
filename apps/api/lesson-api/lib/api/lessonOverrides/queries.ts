import { eq } from "drizzle-orm";

import type { LessonOverrideId } from "../../db/schema/lessonOverrides";
import { db } from "../../db/index";
import {
  lessonOverrideIdSchema,
  lessonOverrides,
} from "../../db/schema/lessonOverrides";
import { lessons } from "../../db/schema/lessons";

export const getLessonOverrides = async () => {
  const rows = await db
    .select({ lessonOverride: lessonOverrides, lesson: lessons })
    .from(lessonOverrides)
    .leftJoin(lessons, eq(lessonOverrides.lessonId, lessons.id));
  const l = rows.map((r) => ({ ...r.lessonOverride, lesson: r.lesson }));
  return { lessonOverrides: l };
};

export const getLessonOverrideById = async (id: LessonOverrideId) => {
  const { id: lessonOverrideId } = lessonOverrideIdSchema.parse({ id });
  const [row] = await db
    .select({ lessonOverride: lessonOverrides, lesson: lessons })
    .from(lessonOverrides)
    .where(eq(lessonOverrides.id, lessonOverrideId))
    .leftJoin(lessons, eq(lessonOverrides.lessonId, lessons.id));
  if (row === undefined) return {};
  const l = { ...row.lessonOverride, lesson: row.lesson };
  return { lessonOverride: l };
};
