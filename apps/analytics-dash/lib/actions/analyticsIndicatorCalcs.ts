"use server";

import { revalidatePath } from "next/cache";
import {
  createAnalyticsIndicatorCalc,
  deleteAnalyticsIndicatorCalc,
  updateAnalyticsIndicatorCalc,
} from "@/lib/api/analyticsIndicatorCalcs/mutations";
import {
  AnalyticsIndicatorCalcId,
  NewAnalyticsIndicatorCalcParams,
  UpdateAnalyticsIndicatorCalcParams,
  analyticsIndicatorCalcIdSchema,
  insertAnalyticsIndicatorCalcParams,
  updateAnalyticsIndicatorCalcParams,
} from "@/lib/db/schema/analyticsIndicatorCalcs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsIndicatorCalcs = () => revalidatePath("/analytics-indicator-calcs");

export const createAnalyticsIndicatorCalcAction = async (input: NewAnalyticsIndicatorCalcParams) => {
  try {
    const payload = insertAnalyticsIndicatorCalcParams.parse(input);
    await createAnalyticsIndicatorCalc(payload);
    revalidateAnalyticsIndicatorCalcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsIndicatorCalcAction = async (input: UpdateAnalyticsIndicatorCalcParams) => {
  try {
    const payload = updateAnalyticsIndicatorCalcParams.parse(input);
    await updateAnalyticsIndicatorCalc(payload.id, payload);
    revalidateAnalyticsIndicatorCalcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsIndicatorCalcAction = async (input: AnalyticsIndicatorCalcId) => {
  try {
    const payload = analyticsIndicatorCalcIdSchema.parse({ id: input });
    await deleteAnalyticsIndicatorCalc(payload.id);
    revalidateAnalyticsIndicatorCalcs();
  } catch (e) {
    return handleErrors(e);
  }
};