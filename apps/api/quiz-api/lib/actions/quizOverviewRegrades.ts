"use server";

import { revalidatePath } from "next/cache";

import {
  createQuizOverviewRegrade,
  deleteQuizOverviewRegrade,
  updateQuizOverviewRegrade,
} from "../api/quizOverviewRegrades/mutations";
import {
  insertQuizOverviewRegradeParams,
  NewQuizOverviewRegradeParams,
  QuizOverviewRegradeId,
  quizOverviewRegradeIdSchema,
  UpdateQuizOverviewRegradeParams,
  updateQuizOverviewRegradeParams,
} from "../db/schema/quizOverviewRegrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizOverviewRegrades = () =>
  revalidatePath("/quiz-overview-regrades");

export const createQuizOverviewRegradeAction = async (
  input: NewQuizOverviewRegradeParams,
) => {
  try {
    const payload = insertQuizOverviewRegradeParams.parse(input);
    await createQuizOverviewRegrade(payload);
    revalidateQuizOverviewRegrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizOverviewRegradeAction = async (
  input: UpdateQuizOverviewRegradeParams,
) => {
  try {
    const payload = updateQuizOverviewRegradeParams.parse(input);
    await updateQuizOverviewRegrade(payload.id, payload);
    revalidateQuizOverviewRegrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizOverviewRegradeAction = async (
  input: QuizOverviewRegradeId,
) => {
  try {
    const payload = quizOverviewRegradeIdSchema.parse({ id: input });
    await deleteQuizOverviewRegrade(payload.id);
    revalidateQuizOverviewRegrades();
  } catch (e) {
    return handleErrors(e);
  }
};
