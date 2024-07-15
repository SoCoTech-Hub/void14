"use server";

import { revalidatePath } from "next/cache";
import {
  createSurveyQuestion,
  deleteSurveyQuestion,
  updateSurveyQuestion,
} from "@/lib/api/surveyQuestions/mutations";
import {
  SurveyQuestionId,
  NewSurveyQuestionParams,
  UpdateSurveyQuestionParams,
  surveyQuestionIdSchema,
  insertSurveyQuestionParams,
  updateSurveyQuestionParams,
} from "@/lib/db/schema/surveyQuestions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSurveyQuestions = () => revalidatePath("/survey-questions");

export const createSurveyQuestionAction = async (input: NewSurveyQuestionParams) => {
  try {
    const payload = insertSurveyQuestionParams.parse(input);
    await createSurveyQuestion(payload);
    revalidateSurveyQuestions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSurveyQuestionAction = async (input: UpdateSurveyQuestionParams) => {
  try {
    const payload = updateSurveyQuestionParams.parse(input);
    await updateSurveyQuestion(payload.id, payload);
    revalidateSurveyQuestions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSurveyQuestionAction = async (input: SurveyQuestionId) => {
  try {
    const payload = surveyQuestionIdSchema.parse({ id: input });
    await deleteSurveyQuestion(payload.id);
    revalidateSurveyQuestions();
  } catch (e) {
    return handleErrors(e);
  }
};
