import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertQuestionNumericalOptionSchema,
  NewQuestionNumericalOptionParams,
  QuestionNumericalOptionId,
  questionNumericalOptionIdSchema,
  questionNumericalOptions,
  UpdateQuestionNumericalOptionParams,
  updateQuestionNumericalOptionSchema,
} from "../../db/schema/questionNumericalOptions";

export const createQuestionNumericalOption = async (
  questionNumericalOption: NewQuestionNumericalOptionParams,
) => {
  const newQuestionNumericalOption = insertQuestionNumericalOptionSchema.parse(
    questionNumericalOption,
  );
  try {
    const [q] = await db
      .insert(questionNumericalOptions)
      .values(newQuestionNumericalOption)
      .returning();
    return { questionNumericalOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionNumericalOption = async (
  id: QuestionNumericalOptionId,
  questionNumericalOption: UpdateQuestionNumericalOptionParams,
) => {
  const { id: questionNumericalOptionId } =
    questionNumericalOptionIdSchema.parse({ id });
  const newQuestionNumericalOption = updateQuestionNumericalOptionSchema.parse(
    questionNumericalOption,
  );
  try {
    const [q] = await db
      .update(questionNumericalOptions)
      .set(newQuestionNumericalOption)
      .where(eq(questionNumericalOptions.id, questionNumericalOptionId!))
      .returning();
    return { questionNumericalOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionNumericalOption = async (
  id: QuestionNumericalOptionId,
) => {
  const { id: questionNumericalOptionId } =
    questionNumericalOptionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionNumericalOptions)
      .where(eq(questionNumericalOptions.id, questionNumericalOptionId!))
      .returning();
    return { questionNumericalOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
