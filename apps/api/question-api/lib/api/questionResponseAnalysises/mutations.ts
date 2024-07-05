import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertQuestionResponseAnalysiseSchema,
  NewQuestionResponseAnalysiseParams,
  QuestionResponseAnalysiseId,
  questionResponseAnalysiseIdSchema,
  questionResponseAnalysises,
  UpdateQuestionResponseAnalysiseParams,
  updateQuestionResponseAnalysiseSchema,
} from "../../db/schema/questionResponseAnalysises";

export const createQuestionResponseAnalysise = async (
  questionResponseAnalysise: NewQuestionResponseAnalysiseParams,
) => {
  const newQuestionResponseAnalysise =
    insertQuestionResponseAnalysiseSchema.parse(questionResponseAnalysise);
  try {
    const [q] = await db
      .insert(questionResponseAnalysises)
      .values(newQuestionResponseAnalysise)
      .returning();
    return { questionResponseAnalysise: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionResponseAnalysise = async (
  id: QuestionResponseAnalysiseId,
  questionResponseAnalysise: UpdateQuestionResponseAnalysiseParams,
) => {
  const { id: questionResponseAnalysiseId } =
    questionResponseAnalysiseIdSchema.parse({ id });
  const newQuestionResponseAnalysise =
    updateQuestionResponseAnalysiseSchema.parse(questionResponseAnalysise);
  try {
    const [q] = await db
      .update(questionResponseAnalysises)
      .set({ ...newQuestionResponseAnalysise, updatedAt: new Date() })
      .where(eq(questionResponseAnalysises.id, questionResponseAnalysiseId!))
      .returning();
    return { questionResponseAnalysise: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionResponseAnalysise = async (
  id: QuestionResponseAnalysiseId,
) => {
  const { id: questionResponseAnalysiseId } =
    questionResponseAnalysiseIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionResponseAnalysises)
      .where(eq(questionResponseAnalysises.id, questionResponseAnalysiseId!))
      .returning();
    return { questionResponseAnalysise: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
