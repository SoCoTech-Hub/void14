"use server";

import { revalidatePath } from "next/cache";

import {
  createQuizOverride,
  deleteQuizOverride,
  updateQuizOverride,
} from "../api/quizOverrides/mutations";
import {
  insertQuizOverrideParams,
  NewQuizOverrideParams,
  QuizOverrideId,
  quizOverrideIdSchema,
  UpdateQuizOverrideParams,
  updateQuizOverrideParams,
} from "../db/schema/quizOverrides";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizOverrides = () => revalidatePath("/quiz-overrides");

export const createQuizOverrideAction = async (
  input: NewQuizOverrideParams,
) => {
  try {
    const payload = insertQuizOverrideParams.parse(input);
    await createQuizOverride(payload);
    revalidateQuizOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizOverrideAction = async (
  input: UpdateQuizOverrideParams,
) => {
  try {
    const payload = updateQuizOverrideParams.parse(input);
    await updateQuizOverride(payload.id, payload);
    revalidateQuizOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizOverrideAction = async (input: QuizOverrideId) => {
  try {
    const payload = quizOverrideIdSchema.parse({ id: input });
    await deleteQuizOverride(payload.id);
    revalidateQuizOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};
