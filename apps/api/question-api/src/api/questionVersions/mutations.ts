import type {
  NewQuestionVersionParams,
  QuestionVersionId,
  UpdateQuestionVersionParams,
} from "@soco/question-db/schema/questionVersions";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionVersionSchema,
  questionVersionIdSchema,
  questionVersions,
  updateQuestionVersionSchema,
} from "@soco/question-db/schema/questionVersions";

export const createQuestionVersion = async (
  questionVersion: NewQuestionVersionParams,
) => {
  const newQuestionVersion = insertQuestionVersionSchema.parse(questionVersion);
  try {
    const [q] = await db
      .insert(questionVersions)
      .values(newQuestionVersion)
      .returning();
    return { questionVersion: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionVersion = async (
  id: QuestionVersionId,
  questionVersion: UpdateQuestionVersionParams,
) => {
  const { id: questionVersionId } = questionVersionIdSchema.parse({ id });
  const newQuestionVersion = updateQuestionVersionSchema.parse(questionVersion);
  try {
    const [q] = await db
      .update(questionVersions)
      .set(newQuestionVersion)
      .where(eq(questionVersions.id, questionVersionId!))
      .returning();
    return { questionVersion: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionVersion = async (id: QuestionVersionId) => {
  const { id: questionVersionId } = questionVersionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionVersions)
      .where(eq(questionVersions.id, questionVersionId!))
      .returning();
    return { questionVersion: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
