"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionAttempt,
  deleteQuestionAttempt,
  updateQuestionAttempt,
} from "../api/questionAttempts/mutations";
import {
  insertQuestionAttemptParams,
  NewQuestionAttemptParams,
  QuestionAttemptId,
  questionAttemptIdSchema,
  UpdateQuestionAttemptParams,
  updateQuestionAttemptParams,
} from "../db/schema/questionAttempts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionAttempts = () => revalidatePath("/question-attempts");

export const createQuestionAttemptAction = async (
  input: NewQuestionAttemptParams,
) => {
  try {
    const payload = insertQuestionAttemptParams.parse(input);
    await createQuestionAttempt(payload);
    revalidateQuestionAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionAttemptAction = async (
  input: UpdateQuestionAttemptParams,
) => {
  try {
    const payload = updateQuestionAttemptParams.parse(input);
    await updateQuestionAttempt(payload.id, payload);
    revalidateQuestionAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionAttemptAction = async (input: QuestionAttemptId) => {
  try {
    const payload = questionAttemptIdSchema.parse({ id: input });
    await deleteQuestionAttempt(payload.id);
    revalidateQuestionAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};
