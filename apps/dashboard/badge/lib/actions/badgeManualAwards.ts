"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeManualAward,
  deleteBadgeManualAward,
  updateBadgeManualAward,
} from "@/lib/api/badgeManualAwards/mutations";
import {
  BadgeManualAwardId,
  NewBadgeManualAwardParams,
  UpdateBadgeManualAwardParams,
  badgeManualAwardIdSchema,
  insertBadgeManualAwardParams,
  updateBadgeManualAwardParams,
} from "@/lib/db/schema/badgeManualAwards";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeManualAwards = () => revalidatePath("/badge-manual-awards");

export const createBadgeManualAwardAction = async (input: NewBadgeManualAwardParams) => {
  try {
    const payload = insertBadgeManualAwardParams.parse(input);
    await createBadgeManualAward(payload);
    revalidateBadgeManualAwards();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeManualAwardAction = async (input: UpdateBadgeManualAwardParams) => {
  try {
    const payload = updateBadgeManualAwardParams.parse(input);
    await updateBadgeManualAward(payload.id, payload);
    revalidateBadgeManualAwards();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeManualAwardAction = async (input: BadgeManualAwardId) => {
  try {
    const payload = badgeManualAwardIdSchema.parse({ id: input });
    await deleteBadgeManualAward(payload.id);
    revalidateBadgeManualAwards();
  } catch (e) {
    return handleErrors(e);
  }
};
