import { eq } from "drizzle-orm";

import type { LessonPageId } from "../db/schema/lessonPages";
import { db } from "../db/index";
import { lessonPageIdSchema, lessonPages } from "../db/schema/lessonPages";

export const getLessonPages = async () => {
  const rows = await db.select().from(lessonPages);
  const l = rows;
  return { lessonPages: l };
};

export const getLessonPageById = async (id: LessonPageId) => {
  const { id: lessonPageId } = lessonPageIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(lessonPages)
    .where(eq(lessonPages.id, lessonPageId));
  if (row === undefined) return {};
  const l = row;
  return { lessonPage: l };
};
