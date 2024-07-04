import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQuestionDatasetItemSchema,
  NewQuestionDatasetItemParams,
  QuestionDatasetItemId,
  questionDatasetItemIdSchema,
  questionDatasetItems,
  UpdateQuestionDatasetItemParams,
  updateQuestionDatasetItemSchema,
} from "../db/schema/questionDatasetItems";

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
