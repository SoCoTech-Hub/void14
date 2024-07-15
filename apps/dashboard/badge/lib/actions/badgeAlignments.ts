"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeAlignment,
  deleteBadgeAlignment,
  updateBadgeAlignment,
} from "@/lib/api/badgeAlignments/mutations";
import {
  BadgeAlignmentId,
  NewBadgeAlignmentParams,
  UpdateBadgeAlignmentParams,
  badgeAlignmentIdSchema,
  insertBadgeAlignmentParams,
  updateBadgeAlignmentParams,
} from "@/lib/db/schema/badgeAlignments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeAlignments = () => revalidatePath("/badge-alignments");

export const createBadgeAlignmentAction = async (input: NewBadgeAlignmentParams) => {
  try {
    const payload = insertBadgeAlignmentParams.parse(input);
    await createBadgeAlignment(payload);
    revalidateBadgeAlignments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeAlignmentAction = async (input: UpdateBadgeAlignmentParams) => {
  try {
    const payload = updateBadgeAlignmentParams.parse(input);
    await updateBadgeAlignment(payload.id, payload);
    revalidateBadgeAlignments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeAlignmentAction = async (input: BadgeAlignmentId) => {
  try {
    const payload = badgeAlignmentIdSchema.parse({ id: input });
    await deleteBadgeAlignment(payload.id);
    revalidateBadgeAlignments();
  } catch (e) {
    return handleErrors(e);
  }
};
