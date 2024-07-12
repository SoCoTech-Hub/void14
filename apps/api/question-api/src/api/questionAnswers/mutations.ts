import type {
  NewQuestionAnswerParams,
  QuestionAnswerId,
  UpdateQuestionAnswerParams,
} from "@soco/question-db/schema/questionAnswers";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionAnswerSchema,
  questionAnswerIdSchema,
  questionAnswers,
  updateQuestionAnswerSchema,
} from "@soco/question-db/schema/questionAnswers";

export const createQuestionAnswer = async (
  questionAnswer: NewQuestionAnswerParams,
) => {
  const newQuestionAnswer = insertQuestionAnswerSchema.parse(questionAnswer);
  try {
    const [q] = await db
      .insert(questionAnswers)
      .values(newQuestionAnswer)
      .returning();
    return { questionAnswer: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionAnswer = async (
  id: QuestionAnswerId,
  questionAnswer: UpdateQuestionAnswerParams,
) => {
  const { id: questionAnswerId } = questionAnswerIdSchema.parse({ id });
  const newQuestionAnswer = updateQuestionAnswerSchema.parse(questionAnswer);
  try {
    const [q] = await db
      .update(questionAnswers)
      .set(newQuestionAnswer)
      .where(eq(questionAnswers.id, questionAnswerId!))
      .returning();
    return { questionAnswer: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionAnswer = async (id: QuestionAnswerId) => {
  const { id: questionAnswerId } = questionAnswerIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionAnswers)
      .where(eq(questionAnswers.id, questionAnswerId!))
      .returning();
    return { questionAnswer: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
