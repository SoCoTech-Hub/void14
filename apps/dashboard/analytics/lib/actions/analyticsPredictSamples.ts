"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsPredictSample,
  deleteAnalyticsPredictSample,
  updateAnalyticsPredictSample,
} from "@/lib/api/analyticsPredictSamples/mutations";
import {
  AnalyticsPredictSampleId,
  NewAnalyticsPredictSampleParams,
  UpdateAnalyticsPredictSampleParams,
  analyticsPredictSampleIdSchema,
  insertAnalyticsPredictSampleParams,
  updateAnalyticsPredictSampleParams,
} from "@/lib/db/schema/analyticsPredictSamples";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsPredictSamples = () => revalidatePath("/analytics-predict-samples");

export const createAnalyticsPredictSampleAction = async (input: NewAnalyticsPredictSampleParams) => {
  try {
    const payload = insertAnalyticsPredictSampleParams.parse(input);
    await createAnalyticsPredictSample(payload);
    revalidateAnalyticsPredictSamples();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsPredictSampleAction = async (input: UpdateAnalyticsPredictSampleParams) => {
  try {
    const payload = updateAnalyticsPredictSampleParams.parse(input);
    await updateAnalyticsPredictSample(payload.id, payload);
    revalidateAnalyticsPredictSamples();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsPredictSampleAction = async (input: AnalyticsPredictSampleId) => {
  try {
    const payload = analyticsPredictSampleIdSchema.parse({ id: input });
    await deleteAnalyticsPredictSample(payload.id);
    revalidateAnalyticsPredictSamples();
  } catch (e) {
    return handleErrors(e);
  }
};
