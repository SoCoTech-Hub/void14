"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeCriteriaParam,
  deleteBadgeCriteriaParam,
  updateBadgeCriteriaParam,
} from "@/lib/api/badgeCriteriaParams/mutations";
import {
  BadgeCriteriaParamId,
  NewBadgeCriteriaParamParams,
  UpdateBadgeCriteriaParamParams,
  badgeCriteriaParamIdSchema,
  insertBadgeCriteriaParamParams,
  updateBadgeCriteriaParamParams,
} from "@/lib/db/schema/badgeCriteriaParams";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeCriteriaParams = () => revalidatePath("/badge-criteria-params");

export const createBadgeCriteriaParamAction = async (input: NewBadgeCriteriaParamParams) => {
  try {
    const payload = insertBadgeCriteriaParamParams.parse(input);
    await createBadgeCriteriaParam(payload);
    revalidateBadgeCriteriaParams();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeCriteriaParamAction = async (input: UpdateBadgeCriteriaParamParams) => {
  try {
    const payload = updateBadgeCriteriaParamParams.parse(input);
    await updateBadgeCriteriaParam(payload.id, payload);
    revalidateBadgeCriteriaParams();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeCriteriaParamAction = async (input: BadgeCriteriaParamId) => {
  try {
    const payload = badgeCriteriaParamIdSchema.parse({ id: input });
    await deleteBadgeCriteriaParam(payload.id);
    revalidateBadgeCriteriaParams();
  } catch (e) {
    return handleErrors(e);
  }
};