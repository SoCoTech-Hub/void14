import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQuestionDatasetSchema,
  NewQuestionDatasetParams,
  QuestionDatasetId,
  questionDatasetIdSchema,
  questionDatasets,
  UpdateQuestionDatasetParams,
  updateQuestionDatasetSchema,
} from "../db/schema/questionDatasets";

export const createQuestionDataset = async (
  questionDataset: NewQuestionDatasetParams,
) => {
  const newQuestionDataset = insertQuestionDatasetSchema.parse(questionDataset);
  try {
    const [q] = await db
      .insert(questionDatasets)
      .values(newQuestionDataset)
      .returning();
    return { questionDataset: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionDataset = async (
  id: QuestionDatasetId,
  questionDataset: UpdateQuestionDatasetParams,
) => {
  const { id: questionDatasetId } = questionDatasetIdSchema.parse({ id });
  const newQuestionDataset = updateQuestionDatasetSchema.parse(questionDataset);
  try {
    const [q] = await db
      .update(questionDatasets)
      .set(newQuestionDataset)
      .where(eq(questionDatasets.id, questionDatasetId!))
      .returning();
    return { questionDataset: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionDataset = async (id: QuestionDatasetId) => {
  const { id: questionDatasetId } = questionDatasetIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionDatasets)
      .where(eq(questionDatasets.id, questionDatasetId!))
      .returning();
    return { questionDataset: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
