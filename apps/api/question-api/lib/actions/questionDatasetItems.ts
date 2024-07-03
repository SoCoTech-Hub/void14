"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionDatasetItem,
  deleteQuestionDatasetItem,
  updateQuestionDatasetItem,
} from "@/lib/api/questionDatasetItems/mutations";
import {
  QuestionDatasetItemId,
  NewQuestionDatasetItemParams,
  UpdateQuestionDatasetItemParams,
  questionDatasetItemIdSchema,
  insertQuestionDatasetItemParams,
  updateQuestionDatasetItemParams,
} from "@/lib/db/schema/questionDatasetItems";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionDatasetItems = () => revalidatePath("/question-dataset-items");

export const createQuestionDatasetItemAction = async (input: NewQuestionDatasetItemParams) => {
  try {
    const payload = insertQuestionDatasetItemParams.parse(input);
    await createQuestionDatasetItem(payload);
    revalidateQuestionDatasetItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionDatasetItemAction = async (input: UpdateQuestionDatasetItemParams) => {
  try {
    const payload = updateQuestionDatasetItemParams.parse(input);
    await updateQuestionDatasetItem(payload.id, payload);
    revalidateQuestionDatasetItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionDatasetItemAction = async (input: QuestionDatasetItemId) => {
  try {
    const payload = questionDatasetItemIdSchema.parse({ id: input });
    await deleteQuestionDatasetItem(payload.id);
    revalidateQuestionDatasetItems();
  } catch (e) {
    return handleErrors(e);
  }
};