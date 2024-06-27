"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizFeedback,
  deleteQuizFeedback,
  updateQuizFeedback,
} from "@/lib/api/quizFeedbacks/mutations";
import {
  QuizFeedbackId,
  NewQuizFeedbackParams,
  UpdateQuizFeedbackParams,
  quizFeedbackIdSchema,
  insertQuizFeedbackParams,
  updateQuizFeedbackParams,
} from "@/lib/db/schema/quizFeedbacks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizFeedbacks = () => revalidatePath("/quiz-feedbacks");

export const createQuizFeedbackAction = async (input: NewQuizFeedbackParams) => {
  try {
    const payload = insertQuizFeedbackParams.parse(input);
    await createQuizFeedback(payload);
    revalidateQuizFeedbacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizFeedbackAction = async (input: UpdateQuizFeedbackParams) => {
  try {
    const payload = updateQuizFeedbackParams.parse(input);
    await updateQuizFeedback(payload.id, payload);
    revalidateQuizFeedbacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizFeedbackAction = async (input: QuizFeedbackId) => {
  try {
    const payload = quizFeedbackIdSchema.parse({ id: input });
    await deleteQuizFeedback(payload.id);
    revalidateQuizFeedbacks();
  } catch (e) {
    return handleErrors(e);
  }
};