"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeCriteria,
  deleteBadgeCriteria,
  updateBadgeCriteria,
} from "@/lib/api/badgeCriterias/mutations";
import {
  BadgeCriteriaId,
  NewBadgeCriteriaParams,
  UpdateBadgeCriteriaParams,
  badgeCriteriaIdSchema,
  insertBadgeCriteriaParams,
  updateBadgeCriteriaParams,
} from "@/lib/db/schema/badgeCriterias";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeCriterias = () => revalidatePath("/badge-criterias");

export const createBadgeCriteriaAction = async (input: NewBadgeCriteriaParams) => {
  try {
    const payload = insertBadgeCriteriaParams.parse(input);
    await createBadgeCriteria(payload);
    revalidateBadgeCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeCriteriaAction = async (input: UpdateBadgeCriteriaParams) => {
  try {
    const payload = updateBadgeCriteriaParams.parse(input);
    await updateBadgeCriteria(payload.id, payload);
    revalidateBadgeCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeCriteriaAction = async (input: BadgeCriteriaId) => {
  try {
    const payload = badgeCriteriaIdSchema.parse({ id: input });
    await deleteBadgeCriteria(payload.id);
    revalidateBadgeCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};
