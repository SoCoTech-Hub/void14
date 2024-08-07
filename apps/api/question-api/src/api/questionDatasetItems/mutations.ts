import type {
  NewQuestionDatasetItemParams,
  QuestionDatasetItemId,
  UpdateQuestionDatasetItemParams,
} from "@soco/question-db/schema/questionDatasetItems";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionDatasetItemSchema,
  questionDatasetItemIdSchema,
  questionDatasetItems,
  updateQuestionDatasetItemSchema,
} from "@soco/question-db/schema/questionDatasetItems";

export const createQuestionDatasetItem = async (
  questionDatasetItem: NewQuestionDatasetItemParams,
) => {
  const newQuestionDatasetItem =
    insertQuestionDatasetItemSchema.parse(questionDatasetItem);
  try {
    const [q] = await db
      .insert(questionDatasetItems)
      .values(newQuestionDatasetItem)
      .returning();
    return { questionDatasetItem: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionDatasetItem = async (
  id: QuestionDatasetItemId,
  questionDatasetItem: UpdateQuestionDatasetItemParams,
) => {
  const { id: questionDatasetItemId } = questionDatasetItemIdSchema.parse({
    id,
  });
  const newQuestionDatasetItem =
    updateQuestionDatasetItemSchema.parse(questionDatasetItem);
  try {
    const [q] = await db
      .update(questionDatasetItems)
      .set(newQuestionDatasetItem)
      .where(eq(questionDatasetItems.id, questionDatasetItemId!))
      .returning();
    return { questionDatasetItem: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionDatasetItem = async (id: QuestionDatasetItemId) => {
  const { id: questionDatasetItemId } = questionDatasetItemIdSchema.parse({
    id,
  });
  try {
    const [q] = await db
      .delete(questionDatasetItems)
      .where(eq(questionDatasetItems.id, questionDatasetItemId!))
      .returning();
    return { questionDatasetItem: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
