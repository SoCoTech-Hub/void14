"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsModel,
  deleteAnalyticsModel,
  updateAnalyticsModel,
} from "@/lib/api/analyticsModels/mutations";
import {
  AnalyticsModelId,
  NewAnalyticsModelParams,
  UpdateAnalyticsModelParams,
  analyticsModelIdSchema,
  insertAnalyticsModelParams,
  updateAnalyticsModelParams,
} from "@/lib/db/schema/analyticsModels";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsModels = () => revalidatePath("/analytics-models");

export const createAnalyticsModelAction = async (input: NewAnalyticsModelParams) => {
  try {
    const payload = insertAnalyticsModelParams.parse(input);
    await createAnalyticsModel(payload);
    revalidateAnalyticsModels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsModelAction = async (input: UpdateAnalyticsModelParams) => {
  try {
    const payload = updateAnalyticsModelParams.parse(input);
    await updateAnalyticsModel(payload.id, payload);
    revalidateAnalyticsModels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsModelAction = async (input: AnalyticsModelId) => {
  try {
    const payload = analyticsModelIdSchema.parse({ id: input });
    await deleteAnalyticsModel(payload.id);
    revalidateAnalyticsModels();
  } catch (e) {
    return handleErrors(e);
  }
};