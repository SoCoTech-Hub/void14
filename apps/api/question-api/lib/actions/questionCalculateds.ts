"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionCalculated,
  deleteQuestionCalculated,
  updateQuestionCalculated,
} from "../api/questionCalculateds/mutations";
import {
  insertQuestionCalculatedParams,
  NewQuestionCalculatedParams,
  QuestionCalculatedId,
  questionCalculatedIdSchema,
  UpdateQuestionCalculatedParams,
  updateQuestionCalculatedParams,
} from "../db/schema/questionCalculateds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionCalculateds = () =>
  revalidatePath("/question-calculateds");

export const createQuestionCalculatedAction = async (
  input: NewQuestionCalculatedParams,
) => {
  try {
    const payload = insertQuestionCalculatedParams.parse(input);
    await createQuestionCalculated(payload);
    revalidateQuestionCalculateds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionCalculatedAction = async (
  input: UpdateQuestionCalculatedParams,
) => {
  try {
    const payload = updateQuestionCalculatedParams.parse(input);
    await updateQuestionCalculated(payload.id, payload);
    revalidateQuestionCalculateds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionCalculatedAction = async (
  input: QuestionCalculatedId,
) => {
  try {
    const payload = questionCalculatedIdSchema.parse({ id: input });
    await deleteQuestionCalculated(payload.id);
    revalidateQuestionCalculateds();
  } catch (e) {
    return handleErrors(e);
  }
};
