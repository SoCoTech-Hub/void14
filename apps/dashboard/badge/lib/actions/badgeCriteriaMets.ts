"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeCriteriaMet,
  deleteBadgeCriteriaMet,
  updateBadgeCriteriaMet,
} from "@/lib/api/badgeCriteriaMets/mutations";
import {
  BadgeCriteriaMetId,
  NewBadgeCriteriaMetParams,
  UpdateBadgeCriteriaMetParams,
  badgeCriteriaMetIdSchema,
  insertBadgeCriteriaMetParams,
  updateBadgeCriteriaMetParams,
} from "@/lib/db/schema/badgeCriteriaMets";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeCriteriaMets = () => revalidatePath("/badge-criteria-mets");

export const createBadgeCriteriaMetAction = async (input: NewBadgeCriteriaMetParams) => {
  try {
    const payload = insertBadgeCriteriaMetParams.parse(input);
    await createBadgeCriteriaMet(payload);
    revalidateBadgeCriteriaMets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeCriteriaMetAction = async (input: UpdateBadgeCriteriaMetParams) => {
  try {
    const payload = updateBadgeCriteriaMetParams.parse(input);
    await updateBadgeCriteriaMet(payload.id, payload);
    revalidateBadgeCriteriaMets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeCriteriaMetAction = async (input: BadgeCriteriaMetId) => {
  try {
    const payload = badgeCriteriaMetIdSchema.parse({ id: input });
    await deleteBadgeCriteriaMet(payload.id);
    revalidateBadgeCriteriaMets();
  } catch (e) {
    return handleErrors(e);
  }
};
