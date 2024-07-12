import type {
  NewQuestionMultianswerParams,
  QuestionMultianswerId,
  UpdateQuestionMultianswerParams,
} from "@soco/question-db/schema/questionMultianswers";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionMultianswerSchema,
  questionMultianswerIdSchema,
  questionMultianswers,
  updateQuestionMultianswerSchema,
} from "@soco/question-db/schema/questionMultianswers";

export const createQuestionMultianswer = async (
  questionMultianswer: NewQuestionMultianswerParams,
) => {
  const newQuestionMultianswer =
    insertQuestionMultianswerSchema.parse(questionMultianswer);
  try {
    const [q] = await db
      .insert(questionMultianswers)
      .values(newQuestionMultianswer)
      .returning();
    return { questionMultianswer: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionMultianswer = async (
  id: QuestionMultianswerId,
  questionMultianswer: UpdateQuestionMultianswerParams,
) => {
  const { id: questionMultianswerId } = questionMultianswerIdSchema.parse({
    id,
  });
  const newQuestionMultianswer =
    updateQuestionMultianswerSchema.parse(questionMultianswer);
  try {
    const [q] = await db
      .update(questionMultianswers)
      .set(newQuestionMultianswer)
      .where(eq(questionMultianswers.id, questionMultianswerId!))
      .returning();
    return { questionMultianswer: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionMultianswer = async (id: QuestionMultianswerId) => {
  const { id: questionMultianswerId } = questionMultianswerIdSchema.parse({
    id,
  });
  try {
    const [q] = await db
      .delete(questionMultianswers)
      .where(eq(questionMultianswers.id, questionMultianswerId!))
      .returning();
    return { questionMultianswer: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
