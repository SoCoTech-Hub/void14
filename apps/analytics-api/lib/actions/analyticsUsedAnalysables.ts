"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsUsedAnalysable,
  deleteAnalyticsUsedAnalysable,
  updateAnalyticsUsedAnalysable,
} from "@/lib/api/analyticsUsedAnalysables/mutations";
import {
  AnalyticsUsedAnalysableId,
  NewAnalyticsUsedAnalysableParams,
  UpdateAnalyticsUsedAnalysableParams,
  analyticsUsedAnalysableIdSchema,
  insertAnalyticsUsedAnalysableParams,
  updateAnalyticsUsedAnalysableParams,
} from "@/lib/db/schema/analyticsUsedAnalysables";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsUsedAnalysables = () => revalidatePath("/analytics-used-analysables");

export const createAnalyticsUsedAnalysableAction = async (input: NewAnalyticsUsedAnalysableParams) => {
  try {
    const payload = insertAnalyticsUsedAnalysableParams.parse(input);
    await createAnalyticsUsedAnalysable(payload);
    revalidateAnalyticsUsedAnalysables();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsUsedAnalysableAction = async (input: UpdateAnalyticsUsedAnalysableParams) => {
  try {
    const payload = updateAnalyticsUsedAnalysableParams.parse(input);
    await updateAnalyticsUsedAnalysable(payload.id, payload);
    revalidateAnalyticsUsedAnalysables();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsUsedAnalysableAction = async (input: AnalyticsUsedAnalysableId) => {
  try {
    const payload = analyticsUsedAnalysableIdSchema.parse({ id: input });
    await deleteAnalyticsUsedAnalysable(payload.id);
    revalidateAnalyticsUsedAnalysables();
  } catch (e) {
    return handleErrors(e);
  }
};