"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionResponseCount,
  deleteQuestionResponseCount,
  updateQuestionResponseCount,
} from "@/lib/api/questionResponseCounts/mutations";
import {
  QuestionResponseCountId,
  NewQuestionResponseCountParams,
  UpdateQuestionResponseCountParams,
  questionResponseCountIdSchema,
  insertQuestionResponseCountParams,
  updateQuestionResponseCountParams,
} from "@/lib/db/schema/questionResponseCounts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionResponseCounts = () => revalidatePath("/question-response-counts");

export const createQuestionResponseCountAction = async (input: NewQuestionResponseCountParams) => {
  try {
    const payload = insertQuestionResponseCountParams.parse(input);
    await createQuestionResponseCount(payload);
    revalidateQuestionResponseCounts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionResponseCountAction = async (input: UpdateQuestionResponseCountParams) => {
  try {
    const payload = updateQuestionResponseCountParams.parse(input);
    await updateQuestionResponseCount(payload.id, payload);
    revalidateQuestionResponseCounts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionResponseCountAction = async (input: QuestionResponseCountId) => {
  try {
    const payload = questionResponseCountIdSchema.parse({ id: input });
    await deleteQuestionResponseCount(payload.id);
    revalidateQuestionResponseCounts();
  } catch (e) {
    return handleErrors(e);
  }
};