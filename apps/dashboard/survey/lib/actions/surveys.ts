"use server";

import { revalidatePath } from "next/cache";
import {
  createSurvey,
  deleteSurvey,
  updateSurvey,
} from "@/lib/api/surveys/mutations";
import {
  SurveyId,
  NewSurveyParams,
  UpdateSurveyParams,
  surveyIdSchema,
  insertSurveyParams,
  updateSurveyParams,
} from "@/lib/db/schema/surveys";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSurveys = () => revalidatePath("/surveys");

export const createSurveyAction = async (input: NewSurveyParams) => {
  try {
    const payload = insertSurveyParams.parse(input);
    await createSurvey(payload);
    revalidateSurveys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSurveyAction = async (input: UpdateSurveyParams) => {
  try {
    const payload = updateSurveyParams.parse(input);
    await updateSurvey(payload.id, payload);
    revalidateSurveys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSurveyAction = async (input: SurveyId) => {
  try {
    const payload = surveyIdSchema.parse({ id: input });
    await deleteSurvey(payload.id);
    revalidateSurveys();
  } catch (e) {
    return handleErrors(e);
  }
};
