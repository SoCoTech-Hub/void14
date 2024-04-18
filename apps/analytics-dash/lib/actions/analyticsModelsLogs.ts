"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsModelsLog,
  deleteAnalyticsModelsLog,
  updateAnalyticsModelsLog,
} from "@/lib/api/analyticsModelsLogs/mutations";
import {
  AnalyticsModelsLogId,
  NewAnalyticsModelsLogParams,
  UpdateAnalyticsModelsLogParams,
  analyticsModelsLogIdSchema,
  insertAnalyticsModelsLogParams,
  updateAnalyticsModelsLogParams,
} from "@/lib/db/schema/analyticsModelsLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsModelsLogs = () => revalidatePath("/analytics-models-logs");

export const createAnalyticsModelsLogAction = async (input: NewAnalyticsModelsLogParams) => {
  try {
    const payload = insertAnalyticsModelsLogParams.parse(input);
    await createAnalyticsModelsLog(payload);
    revalidateAnalyticsModelsLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsModelsLogAction = async (input: UpdateAnalyticsModelsLogParams) => {
  try {
    const payload = updateAnalyticsModelsLogParams.parse(input);
    await updateAnalyticsModelsLog(payload.id, payload);
    revalidateAnalyticsModelsLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsModelsLogAction = async (input: AnalyticsModelsLogId) => {
  try {
    const payload = analyticsModelsLogIdSchema.parse({ id: input });
    await deleteAnalyticsModelsLog(payload.id);
    revalidateAnalyticsModelsLogs();
  } catch (e) {
    return handleErrors(e);
  }
};