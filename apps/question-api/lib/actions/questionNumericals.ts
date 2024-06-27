"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionNumerical,
  deleteQuestionNumerical,
  updateQuestionNumerical,
} from "@/lib/api/questionNumericals/mutations";
import {
  QuestionNumericalId,
  NewQuestionNumericalParams,
  UpdateQuestionNumericalParams,
  questionNumericalIdSchema,
  insertQuestionNumericalParams,
  updateQuestionNumericalParams,
} from "@/lib/db/schema/questionNumericals";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionNumericals = () => revalidatePath("/question-numericals");

export const createQuestionNumericalAction = async (input: NewQuestionNumericalParams) => {
  try {
    const payload = insertQuestionNumericalParams.parse(input);
    await createQuestionNumerical(payload);
    revalidateQuestionNumericals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionNumericalAction = async (input: UpdateQuestionNumericalParams) => {
  try {
    const payload = updateQuestionNumericalParams.parse(input);
    await updateQuestionNumerical(payload.id, payload);
    revalidateQuestionNumericals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionNumericalAction = async (input: QuestionNumericalId) => {
  try {
    const payload = questionNumericalIdSchema.parse({ id: input });
    await deleteQuestionNumerical(payload.id);
    revalidateQuestionNumericals();
  } catch (e) {
    return handleErrors(e);
  }
};