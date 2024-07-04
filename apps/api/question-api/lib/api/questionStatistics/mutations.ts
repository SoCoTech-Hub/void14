import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQuestionStatisticSchema,
  NewQuestionStatisticParams,
  QuestionStatisticId,
  questionStatisticIdSchema,
  questionStatistics,
  UpdateQuestionStatisticParams,
  updateQuestionStatisticSchema,
} from "../db/schema/questionStatistics";

export const createQuestionStatistic = async (
  questionStatistic: NewQuestionStatisticParams,
) => {
  const newQuestionStatistic =
    insertQuestionStatisticSchema.parse(questionStatistic);
  try {
    const [q] = await db
      .insert(questionStatistics)
      .values(newQuestionStatistic)
      .returning();
    return { questionStatistic: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionStatistic = async (
  id: QuestionStatisticId,
  questionStatistic: UpdateQuestionStatisticParams,
) => {
  const { id: questionStatisticId } = questionStatisticIdSchema.parse({ id });
  const newQuestionStatistic =
    updateQuestionStatisticSchema.parse(questionStatistic);
  try {
    const [q] = await db
      .update(questionStatistics)
      .set({ ...newQuestionStatistic, updatedAt: new Date() })
      .where(eq(questionStatistics.id, questionStatisticId!))
      .returning();
    return { questionStatistic: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionStatistic = async (id: QuestionStatisticId) => {
  const { id: questionStatisticId } = questionStatisticIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionStatistics)
      .where(eq(questionStatistics.id, questionStatisticId!))
      .returning();
    return { questionStatistic: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
