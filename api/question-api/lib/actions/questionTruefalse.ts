"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionTruefalse,
  deleteQuestionTruefalse,
  updateQuestionTruefalse,
} from "@/lib/api/questionTruefalse/mutations";
import {
  QuestionTruefalseId,
  NewQuestionTruefalseParams,
  UpdateQuestionTruefalseParams,
  questionTruefalseIdSchema,
  insertQuestionTruefalseParams,
  updateQuestionTruefalseParams,
} from "@/lib/db/schema/questionTruefalse";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionTruefalses = () => revalidatePath("/question-truefalse");

export const createQuestionTruefalseAction = async (input: NewQuestionTruefalseParams) => {
  try {
    const payload = insertQuestionTruefalseParams.parse(input);
    await createQuestionTruefalse(payload);
    revalidateQuestionTruefalses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionTruefalseAction = async (input: UpdateQuestionTruefalseParams) => {
  try {
    const payload = updateQuestionTruefalseParams.parse(input);
    await updateQuestionTruefalse(payload.id, payload);
    revalidateQuestionTruefalses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionTruefalseAction = async (input: QuestionTruefalseId) => {
  try {
    const payload = questionTruefalseIdSchema.parse({ id: input });
    await deleteQuestionTruefalse(payload.id);
    revalidateQuestionTruefalses();
  } catch (e) {
    return handleErrors(e);
  }
};