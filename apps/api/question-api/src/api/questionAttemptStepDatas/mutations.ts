import type {
  NewQuestionAttemptStepDataParams,
  QuestionAttemptStepDataId,
  UpdateQuestionAttemptStepDataParams,
} from "@soco/question-db/schema/questionAttemptStepDatas";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionAttemptStepDataSchema,
  questionAttemptStepDataIdSchema,
  questionAttemptStepDatas,
  updateQuestionAttemptStepDataSchema,
} from "@soco/question-db/schema/questionAttemptStepDatas";

export const createQuestionAttemptStepData = async (
  questionAttemptStepData: NewQuestionAttemptStepDataParams,
) => {
  const newQuestionAttemptStepData = insertQuestionAttemptStepDataSchema.parse(
    questionAttemptStepData,
  );
  try {
    const [q] = await db
      .insert(questionAttemptStepDatas)
      .values(newQuestionAttemptStepData)
      .returning();
    return { questionAttemptStepData: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionAttemptStepData = async (
  id: QuestionAttemptStepDataId,
  questionAttemptStepData: UpdateQuestionAttemptStepDataParams,
) => {
  const { id: questionAttemptStepDataId } =
    questionAttemptStepDataIdSchema.parse({ id });
  const newQuestionAttemptStepData = updateQuestionAttemptStepDataSchema.parse(
    questionAttemptStepData,
  );
  try {
    const [q] = await db
      .update(questionAttemptStepDatas)
      .set(newQuestionAttemptStepData)
      .where(eq(questionAttemptStepDatas.id, questionAttemptStepDataId!))
      .returning();
    return { questionAttemptStepData: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionAttemptStepData = async (
  id: QuestionAttemptStepDataId,
) => {
  const { id: questionAttemptStepDataId } =
    questionAttemptStepDataIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionAttemptStepDatas)
      .where(eq(questionAttemptStepDatas.id, questionAttemptStepDataId!))
      .returning();
    return { questionAttemptStepData: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
