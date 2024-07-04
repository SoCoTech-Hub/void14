"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionDatasetDefinition,
  deleteQuestionDatasetDefinition,
  updateQuestionDatasetDefinition,
} from "../api/questionDatasetDefinitions/mutations";
import {
  insertQuestionDatasetDefinitionParams,
  NewQuestionDatasetDefinitionParams,
  QuestionDatasetDefinitionId,
  questionDatasetDefinitionIdSchema,
  UpdateQuestionDatasetDefinitionParams,
  updateQuestionDatasetDefinitionParams,
} from "../db/schema/questionDatasetDefinitions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionDatasetDefinitions = () =>
  revalidatePath("/question-dataset-definitions");

export const createQuestionDatasetDefinitionAction = async (
  input: NewQuestionDatasetDefinitionParams,
) => {
  try {
    const payload = insertQuestionDatasetDefinitionParams.parse(input);
    await createQuestionDatasetDefinition(payload);
    revalidateQuestionDatasetDefinitions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionDatasetDefinitionAction = async (
  input: UpdateQuestionDatasetDefinitionParams,
) => {
  try {
    const payload = updateQuestionDatasetDefinitionParams.parse(input);
    await updateQuestionDatasetDefinition(payload.id, payload);
    revalidateQuestionDatasetDefinitions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionDatasetDefinitionAction = async (
  input: QuestionDatasetDefinitionId,
) => {
  try {
    const payload = questionDatasetDefinitionIdSchema.parse({ id: input });
    await deleteQuestionDatasetDefinition(payload.id);
    revalidateQuestionDatasetDefinitions();
  } catch (e) {
    return handleErrors(e);
  }
};
