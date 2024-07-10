import { db } from "@soco/lesson-db/client";
import { eq } from "@soco/lesson-db";
import { type LessonPageId, lessonPageIdSchema, lessonPages } from "@soco/lesson-db/schema/lessonPages";

export const getLessonPages = async () => {
  const rows = await db.select().from(lessonPages);
  const l = rows
  return { lessonPages: l };
};

export const getLessonPageById = async (id: LessonPageId) => {
  const { id: lessonPageId } = lessonPageIdSchema.parse({ id });
  const [row] = await db.select().from(lessonPages).where(eq(lessonPages.id, lessonPageId));
  if (row === undefined) return {};
  const l = row;
  return { lessonPage: l };
};


