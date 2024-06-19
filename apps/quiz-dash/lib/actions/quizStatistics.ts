"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizStatistic,
  deleteQuizStatistic,
  updateQuizStatistic,
} from "@/lib/api/quizStatistics/mutations";
import {
  QuizStatisticId,
  NewQuizStatisticParams,
  UpdateQuizStatisticParams,
  quizStatisticIdSchema,
  insertQuizStatisticParams,
  updateQuizStatisticParams,
} from "@/lib/db/schema/quizStatistics";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizStatistics = () => revalidatePath("/quiz-statistics");

export const createQuizStatisticAction = async (input: NewQuizStatisticParams) => {
  try {
    const payload = insertQuizStatisticParams.parse(input);
    await createQuizStatistic(payload);
    revalidateQuizStatistics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizStatisticAction = async (input: UpdateQuizStatisticParams) => {
  try {
    const payload = updateQuizStatisticParams.parse(input);
    await updateQuizStatistic(payload.id, payload);
    revalidateQuizStatistics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizStatisticAction = async (input: QuizStatisticId) => {
  try {
    const payload = quizStatisticIdSchema.parse({ id: input });
    await deleteQuizStatistic(payload.id);
    revalidateQuizStatistics();
  } catch (e) {
    return handleErrors(e);
  }
};