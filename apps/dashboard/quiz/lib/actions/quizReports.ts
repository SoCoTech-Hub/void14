"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizReport,
  deleteQuizReport,
  updateQuizReport,
} from "@/lib/api/quizReports/mutations";
import {
  QuizReportId,
  NewQuizReportParams,
  UpdateQuizReportParams,
  quizReportIdSchema,
  insertQuizReportParams,
  updateQuizReportParams,
} from "@/lib/db/schema/quizReports";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizReports = () => revalidatePath("/quiz-reports");

export const createQuizReportAction = async (input: NewQuizReportParams) => {
  try {
    const payload = insertQuizReportParams.parse(input);
    await createQuizReport(payload);
    revalidateQuizReports();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizReportAction = async (input: UpdateQuizReportParams) => {
  try {
    const payload = updateQuizReportParams.parse(input);
    await updateQuizReport(payload.id, payload);
    revalidateQuizReports();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizReportAction = async (input: QuizReportId) => {
  try {
    const payload = quizReportIdSchema.parse({ id: input });
    await deleteQuizReport(payload.id);
    revalidateQuizReports();
  } catch (e) {
    return handleErrors(e);
  }
};