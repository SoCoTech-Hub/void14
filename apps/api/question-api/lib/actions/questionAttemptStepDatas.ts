"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionAttemptStepData,
  deleteQuestionAttemptStepData,
  updateQuestionAttemptStepData,
} from "@/lib/api/questionAttemptStepDatas/mutations";
import {
  QuestionAttemptStepDataId,
  NewQuestionAttemptStepDataParams,
  UpdateQuestionAttemptStepDataParams,
  questionAttemptStepDataIdSchema,
  insertQuestionAttemptStepDataParams,
  updateQuestionAttemptStepDataParams,
} from "@/lib/db/schema/questionAttemptStepDatas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionAttemptStepDatas = () => revalidatePath("/question-attempt-step-datas");

export const createQuestionAttemptStepDataAction = async (input: NewQuestionAttemptStepDataParams) => {
  try {
    const payload = insertQuestionAttemptStepDataParams.parse(input);
    await createQuestionAttemptStepData(payload);
    revalidateQuestionAttemptStepDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionAttemptStepDataAction = async (input: UpdateQuestionAttemptStepDataParams) => {
  try {
    const payload = updateQuestionAttemptStepDataParams.parse(input);
    await updateQuestionAttemptStepData(payload.id, payload);
    revalidateQuestionAttemptStepDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionAttemptStepDataAction = async (input: QuestionAttemptStepDataId) => {
  try {
    const payload = questionAttemptStepDataIdSchema.parse({ id: input });
    await deleteQuestionAttemptStepData(payload.id);
    revalidateQuestionAttemptStepDatas();
  } catch (e) {
    return handleErrors(e);
  }
};