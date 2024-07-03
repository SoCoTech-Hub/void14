"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizAttempt,
  deleteQuizAttempt,
  updateQuizAttempt,
} from "@/lib/api/quizAttempts/mutations";
import {
  QuizAttemptId,
  NewQuizAttemptParams,
  UpdateQuizAttemptParams,
  quizAttemptIdSchema,
  insertQuizAttemptParams,
  updateQuizAttemptParams,
} from "@/lib/db/schema/quizAttempts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizAttempts = () => revalidatePath("/quiz-attempts");

export const createQuizAttemptAction = async (input: NewQuizAttemptParams) => {
  try {
    const payload = insertQuizAttemptParams.parse(input);
    await createQuizAttempt(payload);
    revalidateQuizAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizAttemptAction = async (input: UpdateQuizAttemptParams) => {
  try {
    const payload = updateQuizAttemptParams.parse(input);
    await updateQuizAttempt(payload.id, payload);
    revalidateQuizAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizAttemptAction = async (input: QuizAttemptId) => {
  try {
    const payload = quizAttemptIdSchema.parse({ id: input });
    await deleteQuizAttempt(payload.id);
    revalidateQuizAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};