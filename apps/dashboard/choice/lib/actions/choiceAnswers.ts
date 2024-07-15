"use server";

import { revalidatePath } from "next/cache";
import {
  createChoiceAnswer,
  deleteChoiceAnswer,
  updateChoiceAnswer,
} from "@/lib/api/choiceAnswers/mutations";
import {
  ChoiceAnswerId,
  NewChoiceAnswerParams,
  UpdateChoiceAnswerParams,
  choiceAnswerIdSchema,
  insertChoiceAnswerParams,
  updateChoiceAnswerParams,
} from "@/lib/db/schema/choiceAnswers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChoiceAnswers = () => revalidatePath("/choice-answers");

export const createChoiceAnswerAction = async (input: NewChoiceAnswerParams) => {
  try {
    const payload = insertChoiceAnswerParams.parse(input);
    await createChoiceAnswer(payload);
    revalidateChoiceAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChoiceAnswerAction = async (input: UpdateChoiceAnswerParams) => {
  try {
    const payload = updateChoiceAnswerParams.parse(input);
    await updateChoiceAnswer(payload.id, payload);
    revalidateChoiceAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChoiceAnswerAction = async (input: ChoiceAnswerId) => {
  try {
    const payload = choiceAnswerIdSchema.parse({ id: input });
    await deleteChoiceAnswer(payload.id);
    revalidateChoiceAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};
