"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionDataset,
  deleteQuestionDataset,
  updateQuestionDataset,
} from "@/lib/api/questionDatasets/mutations";
import {
  QuestionDatasetId,
  NewQuestionDatasetParams,
  UpdateQuestionDatasetParams,
  questionDatasetIdSchema,
  insertQuestionDatasetParams,
  updateQuestionDatasetParams,
} from "@/lib/db/schema/questionDatasets";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionDatasets = () => revalidatePath("/question-datasets");

export const createQuestionDatasetAction = async (input: NewQuestionDatasetParams) => {
  try {
    const payload = insertQuestionDatasetParams.parse(input);
    await createQuestionDataset(payload);
    revalidateQuestionDatasets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionDatasetAction = async (input: UpdateQuestionDatasetParams) => {
  try {
    const payload = updateQuestionDatasetParams.parse(input);
    await updateQuestionDataset(payload.id, payload);
    revalidateQuestionDatasets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionDatasetAction = async (input: QuestionDatasetId) => {
  try {
    const payload = questionDatasetIdSchema.parse({ id: input });
    await deleteQuestionDataset(payload.id);
    revalidateQuestionDatasets();
  } catch (e) {
    return handleErrors(e);
  }
};