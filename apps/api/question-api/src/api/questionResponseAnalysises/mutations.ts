import type {
  NewQuestionResponseAnalysiseParams,
  QuestionResponseAnalysiseId,
  UpdateQuestionResponseAnalysiseParams,
} from "@soco/question-db/schema/questionResponseAnalysises";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionResponseAnalysiseSchema,
  questionResponseAnalysiseIdSchema,
  questionResponseAnalysises,
  updateQuestionResponseAnalysiseSchema,
} from "@soco/question-db/schema/questionResponseAnalysises";

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
