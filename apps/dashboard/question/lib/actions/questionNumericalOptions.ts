"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionNumericalOption,
  deleteQuestionNumericalOption,
  updateQuestionNumericalOption,
} from "@/lib/api/questionNumericalOptions/mutations";
import {
  QuestionNumericalOptionId,
  NewQuestionNumericalOptionParams,
  UpdateQuestionNumericalOptionParams,
  questionNumericalOptionIdSchema,
  insertQuestionNumericalOptionParams,
  updateQuestionNumericalOptionParams,
} from "@/lib/db/schema/questionNumericalOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionNumericalOptions = () => revalidatePath("/question-numerical-options");

export const createQuestionNumericalOptionAction = async (input: NewQuestionNumericalOptionParams) => {
  try {
    const payload = insertQuestionNumericalOptionParams.parse(input);
    await createQuestionNumericalOption(payload);
    revalidateQuestionNumericalOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionNumericalOptionAction = async (input: UpdateQuestionNumericalOptionParams) => {
  try {
    const payload = updateQuestionNumericalOptionParams.parse(input);
    await updateQuestionNumericalOption(payload.id, payload);
    revalidateQuestionNumericalOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionNumericalOptionAction = async (input: QuestionNumericalOptionId) => {
  try {
    const payload = questionNumericalOptionIdSchema.parse({ id: input });
    await deleteQuestionNumericalOption(payload.id);
    revalidateQuestionNumericalOptions();
  } catch (e) {
    return handleErrors(e);
  }
};