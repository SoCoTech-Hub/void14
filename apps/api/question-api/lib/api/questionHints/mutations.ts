import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertQuestionHintSchema,
  NewQuestionHintParams,
  QuestionHintId,
  questionHintIdSchema,
  questionHints,
  UpdateQuestionHintParams,
  updateQuestionHintSchema,
} from "../../db/schema/questionHints";

export const createQuestionHint = async (
  questionHint: NewQuestionHintParams,
) => {
  const newQuestionHint = insertQuestionHintSchema.parse(questionHint);
  try {
    const [q] = await db
      .insert(questionHints)
      .values(newQuestionHint)
      .returning();
    return { questionHint: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionHint = async (
  id: QuestionHintId,
  questionHint: UpdateQuestionHintParams,
) => {
  const { id: questionHintId } = questionHintIdSchema.parse({ id });
  const newQuestionHint = updateQuestionHintSchema.parse(questionHint);
  try {
    const [q] = await db
      .update(questionHints)
      .set(newQuestionHint)
      .where(eq(questionHints.id, questionHintId!))
      .returning();
    return { questionHint: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionHint = async (id: QuestionHintId) => {
  const { id: questionHintId } = questionHintIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionHints)
      .where(eq(questionHints.id, questionHintId!))
      .returning();
    return { questionHint: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
