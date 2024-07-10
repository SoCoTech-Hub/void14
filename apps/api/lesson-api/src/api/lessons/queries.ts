import { db } from "@soco/lesson-db/client";
import { eq } from "@soco/lesson-db";
import { type LessonId, lessonIdSchema, lessons } from "@soco/lesson-db/schema/lessons";

export const getLessons = async () => {
  const rows = await db.select().from(lessons);
  const l = rows
  return { lessons: l };
};

export const getLessonById = async (id: LessonId) => {
  const { id: lessonId } = lessonIdSchema.parse({ id });
  const [row] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
  if (row === undefined) return {};
  const l = row;
  return { lesson: l };
};


