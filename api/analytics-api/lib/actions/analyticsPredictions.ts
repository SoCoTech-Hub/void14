"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsPrediction,
  deleteAnalyticsPrediction,
  updateAnalyticsPrediction,
} from "@/lib/api/analyticsPredictions/mutations";
import {
  AnalyticsPredictionId,
  NewAnalyticsPredictionParams,
  UpdateAnalyticsPredictionParams,
  analyticsPredictionIdSchema,
  insertAnalyticsPredictionParams,
  updateAnalyticsPredictionParams,
} from "@/lib/db/schema/analyticsPredictions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsPredictions = () => revalidatePath("/analytics-predictions");

export const createAnalyticsPredictionAction = async (input: NewAnalyticsPredictionParams) => {
  try {
    const payload = insertAnalyticsPredictionParams.parse(input);
    await createAnalyticsPrediction(payload);
    revalidateAnalyticsPredictions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsPredictionAction = async (input: UpdateAnalyticsPredictionParams) => {
  try {
    const payload = updateAnalyticsPredictionParams.parse(input);
    await updateAnalyticsPrediction(payload.id, payload);
    revalidateAnalyticsPredictions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsPredictionAction = async (input: AnalyticsPredictionId) => {
  try {
    const payload = analyticsPredictionIdSchema.parse({ id: input });
    await deleteAnalyticsPrediction(payload.id);
    revalidateAnalyticsPredictions();
  } catch (e) {
    return handleErrors(e);
  }
};