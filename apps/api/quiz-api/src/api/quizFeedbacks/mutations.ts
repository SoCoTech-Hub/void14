import type {
  NewQuizFeedbackParams,
  QuizFeedbackId,
  UpdateQuizFeedbackParams,
} from "@soco/quiz-db/schema/quizFeedbacks";
import { eq } from "@soco/quiz-db";
import { db } from "@soco/quiz-db/client";
import {
  insertQuizFeedbackSchema,
  quizFeedbackIdSchema,
  quizFeedbacks,
  updateQuizFeedbackSchema,
} from "@soco/quiz-db/schema/quizFeedbacks";

export const createQuizFeedback = async (
  quizFeedback: NewQuizFeedbackParams,
) => {
  const newQuizFeedback = insertQuizFeedbackSchema.parse(quizFeedback);
  try {
    const [q] = await db
      .insert(quizFeedbacks)
      .values(newQuizFeedback)
      .returning();
    return { quizFeedback: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizFeedback = async (
  id: QuizFeedbackId,
  quizFeedback: UpdateQuizFeedbackParams,
) => {
  const { id: quizFeedbackId } = quizFeedbackIdSchema.parse({ id });
  const newQuizFeedback = updateQuizFeedbackSchema.parse(quizFeedback);
  try {
    const [q] = await db
      .update(quizFeedbacks)
      .set(newQuizFeedback)
      .where(eq(quizFeedbacks.id, quizFeedbackId!))
      .returning();
    return { quizFeedback: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizFeedback = async (id: QuizFeedbackId) => {
  const { id: quizFeedbackId } = quizFeedbackIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(quizFeedbacks)
      .where(eq(quizFeedbacks.id, quizFeedbackId!))
      .returning();
    return { quizFeedback: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
