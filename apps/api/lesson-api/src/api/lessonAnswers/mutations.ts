import type {
  LessonAnswerId,
  NewLessonAnswerParams,
  UpdateLessonAnswerParams,
} from "@soco/lesson-db/schema/lessonAnswers";
import { eq } from "@soco/lesson-db";
import { db } from "@soco/lesson-db/client";
import {
  insertLessonAnswerSchema,
  lessonAnswerIdSchema,
  lessonAnswers,
  updateLessonAnswerSchema,
} from "@soco/lesson-db/schema/lessonAnswers";

export const createLessonAnswer = async (
  lessonAnswer: NewLessonAnswerParams,
) => {
  const newLessonAnswer = insertLessonAnswerSchema.parse(lessonAnswer);
  try {
    const [l] = await db
      .insert(lessonAnswers)
      .values(newLessonAnswer)
      .returning();
    return { lessonAnswer: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonAnswer = async (
  id: LessonAnswerId,
  lessonAnswer: UpdateLessonAnswerParams,
) => {
  const { id: lessonAnswerId } = lessonAnswerIdSchema.parse({ id });
  const newLessonAnswer = updateLessonAnswerSchema.parse(lessonAnswer);
  try {
    const [l] = await db
      .update(lessonAnswers)
      .set({ ...newLessonAnswer, updatedAt: new Date() })
      .where(eq(lessonAnswers.id, lessonAnswerId!))
      .returning();
    return { lessonAnswer: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonAnswer = async (id: LessonAnswerId) => {
  const { id: lessonAnswerId } = lessonAnswerIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(lessonAnswers)
      .where(eq(lessonAnswers.id, lessonAnswerId!))
      .returning();
    return { lessonAnswer: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
