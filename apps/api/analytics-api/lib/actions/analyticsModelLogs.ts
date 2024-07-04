"use server";

import { revalidatePath } from "next/cache";

import {
  createAnalyticsModelLog,
  deleteAnalyticsModelLog,
  updateAnalyticsModelLog,
} from "../api/analyticsModelLogs/mutations";
import {
  AnalyticsModelLogId,
  analyticsModelLogIdSchema,
  insertAnalyticsModelLogParams,
  NewAnalyticsModelLogParams,
  UpdateAnalyticsModelLogParams,
  updateAnalyticsModelLogParams,
} from "../db/schema/analyticsModelLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsModelLogs = () =>
  revalidatePath("/analytics-models-logs");

export const createAnalyticsModelLogAction = async (
  input: NewAnalyticsModelLogParams,
) => {
  try {
    const payload = insertAnalyticsModelLogParams.parse(input);
    await createAnalyticsModelLog(payload);
    revalidateAnalyticsModelLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsModelLogAction = async (
  input: UpdateAnalyticsModelLogParams,
) => {
  try {
    const payload = updateAnalyticsModelLogParams.parse(input);
    await updateAnalyticsModelLog(payload.id, payload);
    revalidateAnalyticsModelLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsModelLogAction = async (
  input: AnalyticsModelLogId,
) => {
  try {
    const payload = analyticsModelLogIdSchema.parse({ id: input });
    await deleteAnalyticsModelLog(payload.id);
    revalidateAnalyticsModelLogs();
  } catch (e) {
    return handleErrors(e);
  }
};
