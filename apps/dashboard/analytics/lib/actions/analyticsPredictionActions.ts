"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsPredictionAction,
  deleteAnalyticsPredictionAction,
  updateAnalyticsPredictionAction,
} from "@/lib/api/analyticsPredictionActions/mutations";
import {
  AnalyticsPredictionActionId,
  NewAnalyticsPredictionActionParams,
  UpdateAnalyticsPredictionActionParams,
  analyticsPredictionActionIdSchema,
  insertAnalyticsPredictionActionParams,
  updateAnalyticsPredictionActionParams,
} from "@/lib/db/schema/analyticsPredictionActions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsPredictionActions = () => revalidatePath("/analytics-prediction-actions");

export const createAnalyticsPredictionActionAction = async (input: NewAnalyticsPredictionActionParams) => {
  try {
    const payload = insertAnalyticsPredictionActionParams.parse(input);
    await createAnalyticsPredictionAction(payload);
    revalidateAnalyticsPredictionActions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsPredictionActionAction = async (input: UpdateAnalyticsPredictionActionParams) => {
  try {
    const payload = updateAnalyticsPredictionActionParams.parse(input);
    await updateAnalyticsPredictionAction(payload.id, payload);
    revalidateAnalyticsPredictionActions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsPredictionActionAction = async (input: AnalyticsPredictionActionId) => {
  try {
    const payload = analyticsPredictionActionIdSchema.parse({ id: input });
    await deleteAnalyticsPredictionAction(payload.id);
    revalidateAnalyticsPredictionActions();
  } catch (e) {
    return handleErrors(e);
  }
};
