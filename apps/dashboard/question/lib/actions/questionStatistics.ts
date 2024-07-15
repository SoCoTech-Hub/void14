"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionStatistic,
  deleteQuestionStatistic,
  updateQuestionStatistic,
} from "@/lib/api/questionStatistics/mutations";
import {
  QuestionStatisticId,
  NewQuestionStatisticParams,
  UpdateQuestionStatisticParams,
  questionStatisticIdSchema,
  insertQuestionStatisticParams,
  updateQuestionStatisticParams,
} from "@/lib/db/schema/questionStatistics";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionStatistics = () => revalidatePath("/question-statistics");

export const createQuestionStatisticAction = async (input: NewQuestionStatisticParams) => {
  try {
    const payload = insertQuestionStatisticParams.parse(input);
    await createQuestionStatistic(payload);
    revalidateQuestionStatistics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionStatisticAction = async (input: UpdateQuestionStatisticParams) => {
  try {
    const payload = updateQuestionStatisticParams.parse(input);
    await updateQuestionStatistic(payload.id, payload);
    revalidateQuestionStatistics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionStatisticAction = async (input: QuestionStatisticId) => {
  try {
    const payload = questionStatisticIdSchema.parse({ id: input });
    await deleteQuestionStatistic(payload.id);
    revalidateQuestionStatistics();
  } catch (e) {
    return handleErrors(e);
  }
};
