import type {
  NewQuestionNumericalUnitParams,
  QuestionNumericalUnitId,
  UpdateQuestionNumericalUnitParams,
} from "@soco/question-db/schema/questionNumericalUnits";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionNumericalUnitSchema,
  questionNumericalUnitIdSchema,
  questionNumericalUnits,
  updateQuestionNumericalUnitSchema,
} from "@soco/question-db/schema/questionNumericalUnits";

export const createQuestionNumericalUnit = async (
  questionNumericalUnit: NewQuestionNumericalUnitParams,
) => {
  const newQuestionNumericalUnit = insertQuestionNumericalUnitSchema.parse(
    questionNumericalUnit,
  );
  try {
    const [q] = await db
      .insert(questionNumericalUnits)
      .values(newQuestionNumericalUnit)
      .returning();
    return { questionNumericalUnit: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionNumericalUnit = async (
  id: QuestionNumericalUnitId,
  questionNumericalUnit: UpdateQuestionNumericalUnitParams,
) => {
  const { id: questionNumericalUnitId } = questionNumericalUnitIdSchema.parse({
    id,
  });
  const newQuestionNumericalUnit = updateQuestionNumericalUnitSchema.parse(
    questionNumericalUnit,
  );
  try {
    const [q] = await db
      .update(questionNumericalUnits)
      .set(newQuestionNumericalUnit)
      .where(eq(questionNumericalUnits.id, questionNumericalUnitId!))
      .returning();
    return { questionNumericalUnit: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionNumericalUnit = async (
  id: QuestionNumericalUnitId,
) => {
  const { id: questionNumericalUnitId } = questionNumericalUnitIdSchema.parse({
    id,
  });
  try {
    const [q] = await db
      .delete(questionNumericalUnits)
      .where(eq(questionNumericalUnits.id, questionNumericalUnitId!))
      .returning();
    return { questionNumericalUnit: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
