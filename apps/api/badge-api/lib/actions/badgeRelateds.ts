"use server";

import { revalidatePath } from "next/cache";

import {
  createBadgeRelated,
  deleteBadgeRelated,
  updateBadgeRelated,
} from "../api/badgeRelateds/mutations";
import {
  BadgeRelatedId,
  badgeRelatedIdSchema,
  insertBadgeRelatedParams,
  NewBadgeRelatedParams,
  UpdateBadgeRelatedParams,
  updateBadgeRelatedParams,
} from "../db/schema/badgeRelateds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeRelateds = () => revalidatePath("/badge-relateds");

export const createBadgeRelatedAction = async (
  input: NewBadgeRelatedParams,
) => {
  try {
    const payload = insertBadgeRelatedParams.parse(input);
    await createBadgeRelated(payload);
    revalidateBadgeRelateds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeRelatedAction = async (
  input: UpdateBadgeRelatedParams,
) => {
  try {
    const payload = updateBadgeRelatedParams.parse(input);
    await updateBadgeRelated(payload.id, payload);
    revalidateBadgeRelateds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeRelatedAction = async (input: BadgeRelatedId) => {
  try {
    const payload = badgeRelatedIdSchema.parse({ id: input });
    await deleteBadgeRelated(payload.id);
    revalidateBadgeRelateds();
  } catch (e) {
    return handleErrors(e);
  }
};
