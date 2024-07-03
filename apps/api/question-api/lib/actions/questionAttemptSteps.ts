"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionAttemptStep,
  deleteQuestionAttemptStep,
  updateQuestionAttemptStep,
} from "@/lib/api/questionAttemptSteps/mutations";
import {
  QuestionAttemptStepId,
  NewQuestionAttemptStepParams,
  UpdateQuestionAttemptStepParams,
  questionAttemptStepIdSchema,
  insertQuestionAttemptStepParams,
  updateQuestionAttemptStepParams,
} from "@/lib/db/schema/questionAttemptSteps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionAttemptSteps = () => revalidatePath("/question-attempt-steps");

export const createQuestionAttemptStepAction = async (input: NewQuestionAttemptStepParams) => {
  try {
    const payload = insertQuestionAttemptStepParams.parse(input);
    await createQuestionAttemptStep(payload);
    revalidateQuestionAttemptSteps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionAttemptStepAction = async (input: UpdateQuestionAttemptStepParams) => {
  try {
    const payload = updateQuestionAttemptStepParams.parse(input);
    await updateQuestionAttemptStep(payload.id, payload);
    revalidateQuestionAttemptSteps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionAttemptStepAction = async (input: QuestionAttemptStepId) => {
  try {
    const payload = questionAttemptStepIdSchema.parse({ id: input });
    await deleteQuestionAttemptStep(payload.id);
    revalidateQuestionAttemptSteps();
  } catch (e) {
    return handleErrors(e);
  }
};