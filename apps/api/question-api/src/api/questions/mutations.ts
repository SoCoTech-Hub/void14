import type {
  NewQuestionParams,
  QuestionId,
  UpdateQuestionParams,
} from "@soco/question-db/schema/questions";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionSchema,
  questionIdSchema,
  questions,
  updateQuestionSchema,
} from "@soco/question-db/schema/questions";

export const createQuestion = async (question: NewQuestionParams) => {
  const { session } = await getUserAuth();
  const newQuestion = insertQuestionSchema.parse({
    ...question,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db.insert(questions).values(newQuestion).returning();
    return { question: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestion = async (
  id: QuestionId,
  question: UpdateQuestionParams,
) => {
  const { session } = await getUserAuth();
  const { id: questionId } = questionIdSchema.parse({ id });
  const newQuestion = updateQuestionSchema.parse({
    ...question,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .update(questions)
      .set({ ...newQuestion, updatedAt: new Date() })
      .where(
        and(
          eq(questions.id, questionId!),
          eq(questions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { question: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestion = async (id: QuestionId) => {
  const { session } = await getUserAuth();
  const { id: questionId } = questionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questions)
      .where(
        and(
          eq(questions.id, questionId!),
          eq(questions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { question: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
