import { eq } from "drizzle-orm";

import type { LessonAnswerId } from "../../db/schema/lessonAnswers";
import { db } from "../../db/index";
import {
  lessonAnswerIdSchema,
  lessonAnswers,
} from "../../db/schema/lessonAnswers";
import { lessonPages } from "../../db/schema/lessonPages";
import { lessons } from "../../db/schema/lessons";

export const getLessonAnswers = async () => {
  const rows = await db
    .select({
      lessonAnswer: lessonAnswers,
      lesson: lessons,
      lessonPage: lessonPages,
    })
    .from(lessonAnswers)
    .leftJoin(lessons, eq(lessonAnswers.lessonId, lessons.id))
    .leftJoin(lessonPages, eq(lessonAnswers.lessonPageId, lessonPages.id));
  const l = rows.map((r) => ({
    ...r.lessonAnswer,
    lesson: r.lesson,
    lessonPage: r.lessonPage,
  }));
  return { lessonAnswers: l };
};

export const getLessonAnswerById = async (id: LessonAnswerId) => {
  const { id: lessonAnswerId } = lessonAnswerIdSchema.parse({ id });
  const [row] = await db
    .select({
      lessonAnswer: lessonAnswers,
      lesson: lessons,
      lessonPage: lessonPages,
    })
    .from(lessonAnswers)
    .where(eq(lessonAnswers.id, lessonAnswerId))
    .leftJoin(lessons, eq(lessonAnswers.lessonId, lessons.id))
    .leftJoin(lessonPages, eq(lessonAnswers.lessonPageId, lessonPages.id));
  if (row === undefined) return {};
  const l = {
    ...row.lessonAnswer,
    lesson: row.lesson,
    lessonPage: row.lessonPage,
  };
  return { lessonAnswer: l };
};
