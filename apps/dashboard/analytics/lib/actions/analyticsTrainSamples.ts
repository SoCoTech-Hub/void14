"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsTrainSample,
  deleteAnalyticsTrainSample,
  updateAnalyticsTrainSample,
} from "@/lib/api/analyticsTrainSamples/mutations";
import {
  AnalyticsTrainSampleId,
  NewAnalyticsTrainSampleParams,
  UpdateAnalyticsTrainSampleParams,
  analyticsTrainSampleIdSchema,
  insertAnalyticsTrainSampleParams,
  updateAnalyticsTrainSampleParams,
} from "@/lib/db/schema/analyticsTrainSamples";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsTrainSamples = () => revalidatePath("/analytics-train-samples");

export const createAnalyticsTrainSampleAction = async (input: NewAnalyticsTrainSampleParams) => {
  try {
    const payload = insertAnalyticsTrainSampleParams.parse(input);
    await createAnalyticsTrainSample(payload);
    revalidateAnalyticsTrainSamples();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsTrainSampleAction = async (input: UpdateAnalyticsTrainSampleParams) => {
  try {
    const payload = updateAnalyticsTrainSampleParams.parse(input);
    await updateAnalyticsTrainSample(payload.id, payload);
    revalidateAnalyticsTrainSamples();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsTrainSampleAction = async (input: AnalyticsTrainSampleId) => {
  try {
    const payload = analyticsTrainSampleIdSchema.parse({ id: input });
    await deleteAnalyticsTrainSample(payload.id);
    revalidateAnalyticsTrainSamples();
  } catch (e) {
    return handleErrors(e);
  }
};
