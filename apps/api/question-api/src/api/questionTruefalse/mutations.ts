import type {
  NewQuestionTruefalseParams,
  QuestionTruefalseId,
  UpdateQuestionTruefalseParams,
} from "@soco/question-db/schema/questionTruefalse";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionTruefalseSchema,
  questionTruefalse,
  questionTruefalseIdSchema,
  updateQuestionTruefalseSchema,
} from "@soco/question-db/schema/questionTruefalse";

export const createQuestionTruefalse = async (
  questionTruefalse: NewQuestionTruefalseParams,
) => {
  const newQuestionTruefalse =
    insertQuestionTruefalseSchema.parse(questionTruefalse);
  try {
    const [q] = await db
      .insert(questionTruefalse)
      .values(newQuestionTruefalse)
      .returning();
    return { questionTruefalse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionTruefalse = async (
  id: QuestionTruefalseId,
  questionTruefalse: UpdateQuestionTruefalseParams,
) => {
  const { id: questionTruefalseId } = questionTruefalseIdSchema.parse({ id });
  const newQuestionTruefalse =
    updateQuestionTruefalseSchema.parse(questionTruefalse);
  try {
    const [q] = await db
      .update(questionTruefalse)
      .set(newQuestionTruefalse)
      .where(eq(questionTruefalse.id, questionTruefalseId!))
      .returning();
    return { questionTruefalse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionTruefalse = async (id: QuestionTruefalseId) => {
  const { id: questionTruefalseId } = questionTruefalseIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionTruefalse)
      .where(eq(questionTruefalse.id, questionTruefalseId!))
      .returning();
    return { questionTruefalse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
