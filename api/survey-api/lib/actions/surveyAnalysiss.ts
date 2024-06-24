"use server";

import { revalidatePath } from "next/cache";
import {
  createSurveyAnalysiss,
  deleteSurveyAnalysiss,
  updateSurveyAnalysiss,
} from "@/lib/api/surveyAnalysiss/mutations";
import {
  SurveyAnalysissId,
  NewSurveyAnalysissParams,
  UpdateSurveyAnalysissParams,
  surveyAnalysissIdSchema,
  insertSurveyAnalysissParams,
  updateSurveyAnalysissParams,
} from "@/lib/db/schema/surveyAnalysiss";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSurveyAnalysisses = () => revalidatePath("/survey-analysiss");

export const createSurveyAnalysissAction = async (input: NewSurveyAnalysissParams) => {
  try {
    const payload = insertSurveyAnalysissParams.parse(input);
    await createSurveyAnalysiss(payload);
    revalidateSurveyAnalysisses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSurveyAnalysissAction = async (input: UpdateSurveyAnalysissParams) => {
  try {
    const payload = updateSurveyAnalysissParams.parse(input);
    await updateSurveyAnalysiss(payload.id, payload);
    revalidateSurveyAnalysisses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSurveyAnalysissAction = async (input: SurveyAnalysissId) => {
  try {
    const payload = surveyAnalysissIdSchema.parse({ id: input });
    await deleteSurveyAnalysiss(payload.id);
    revalidateSurveyAnalysisses();
  } catch (e) {
    return handleErrors(e);
  }
};