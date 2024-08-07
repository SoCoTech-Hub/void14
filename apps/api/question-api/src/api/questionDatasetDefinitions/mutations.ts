import type {
  NewQuestionDatasetDefinitionParams,
  QuestionDatasetDefinitionId,
  UpdateQuestionDatasetDefinitionParams,
} from "@soco/question-db/schema/questionDatasetDefinitions";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionDatasetDefinitionSchema,
  questionDatasetDefinitionIdSchema,
  questionDatasetDefinitions,
  updateQuestionDatasetDefinitionSchema,
} from "@soco/question-db/schema/questionDatasetDefinitions";

export const createQuestionDatasetDefinition = async (
  questionDatasetDefinition: NewQuestionDatasetDefinitionParams,
) => {
  const newQuestionDatasetDefinition =
    insertQuestionDatasetDefinitionSchema.parse(questionDatasetDefinition);
  try {
    const [q] = await db
      .insert(questionDatasetDefinitions)
      .values(newQuestionDatasetDefinition)
      .returning();
    return { questionDatasetDefinition: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionDatasetDefinition = async (
  id: QuestionDatasetDefinitionId,
  questionDatasetDefinition: UpdateQuestionDatasetDefinitionParams,
) => {
  const { id: questionDatasetDefinitionId } =
    questionDatasetDefinitionIdSchema.parse({ id });
  const newQuestionDatasetDefinition =
    updateQuestionDatasetDefinitionSchema.parse(questionDatasetDefinition);
  try {
    const [q] = await db
      .update(questionDatasetDefinitions)
      .set(newQuestionDatasetDefinition)
      .where(eq(questionDatasetDefinitions.id, questionDatasetDefinitionId!))
      .returning();
    return { questionDatasetDefinition: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionDatasetDefinition = async (
  id: QuestionDatasetDefinitionId,
) => {
  const { id: questionDatasetDefinitionId } =
    questionDatasetDefinitionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionDatasetDefinitions)
      .where(eq(questionDatasetDefinitions.id, questionDatasetDefinitionId!))
      .returning();
    return { questionDatasetDefinition: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
