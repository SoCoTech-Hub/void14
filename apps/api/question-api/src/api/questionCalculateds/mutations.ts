import type {
  NewQuestionCalculatedParams,
  QuestionCalculatedId,
  UpdateQuestionCalculatedParams,
} from "@soco/question-db/schema/questionCalculateds";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionCalculatedSchema,
  questionCalculatedIdSchema,
  questionCalculateds,
  updateQuestionCalculatedSchema,
} from "@soco/question-db/schema/questionCalculateds";

export const createQuestionCalculated = async (
  questionCalculated: NewQuestionCalculatedParams,
) => {
  const newQuestionCalculated =
    insertQuestionCalculatedSchema.parse(questionCalculated);
  try {
    const [q] = await db
      .insert(questionCalculateds)
      .values(newQuestionCalculated)
      .returning();
    return { questionCalculated: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionCalculated = async (
  id: QuestionCalculatedId,
  questionCalculated: UpdateQuestionCalculatedParams,
) => {
  const { id: questionCalculatedId } = questionCalculatedIdSchema.parse({ id });
  const newQuestionCalculated =
    updateQuestionCalculatedSchema.parse(questionCalculated);
  try {
    const [q] = await db
      .update(questionCalculateds)
      .set(newQuestionCalculated)
      .where(eq(questionCalculateds.id, questionCalculatedId!))
      .returning();
    return { questionCalculated: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionCalculated = async (id: QuestionCalculatedId) => {
  const { id: questionCalculatedId } = questionCalculatedIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionCalculateds)
      .where(eq(questionCalculateds.id, questionCalculatedId!))
      .returning();
    return { questionCalculated: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
