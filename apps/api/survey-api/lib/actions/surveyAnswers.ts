"use server";

import { revalidatePath } from "next/cache";

import {
  createSurveyAnswer,
  deleteSurveyAnswer,
  updateSurveyAnswer,
} from "../api/surveyAnswers/mutations";
import {
  insertSurveyAnswerParams,
  NewSurveyAnswerParams,
  SurveyAnswerId,
  surveyAnswerIdSchema,
  UpdateSurveyAnswerParams,
  updateSurveyAnswerParams,
} from "../db/schema/surveyAnswers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSurveyAnswers = () => revalidatePath("/survey-answers");

export const createSurveyAnswerAction = async (
  input: NewSurveyAnswerParams,
) => {
  try {
    const payload = insertSurveyAnswerParams.parse(input);
    await createSurveyAnswer(payload);
    revalidateSurveyAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSurveyAnswerAction = async (
  input: UpdateSurveyAnswerParams,
) => {
  try {
    const payload = updateSurveyAnswerParams.parse(input);
    await updateSurveyAnswer(payload.id, payload);
    revalidateSurveyAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSurveyAnswerAction = async (input: SurveyAnswerId) => {
  try {
    const payload = surveyAnswerIdSchema.parse({ id: input });
    await deleteSurveyAnswer(payload.id);
    revalidateSurveyAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};
