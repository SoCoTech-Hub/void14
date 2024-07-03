"use server";

import { revalidatePath } from "next/cache";
import {
  createBadge,
  deleteBadge,
  updateBadge,
} from "@/lib/api/badges/mutations";
import {
  BadgeId,
  NewBadgeParams,
  UpdateBadgeParams,
  badgeIdSchema,
  insertBadgeParams,
  updateBadgeParams,
} from "@/lib/db/schema/badges";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadges = () => revalidatePath("/badges");

export const createBadgeAction = async (input: NewBadgeParams) => {
  try {
    const payload = insertBadgeParams.parse(input);
    await createBadge(payload);
    revalidateBadges();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeAction = async (input: UpdateBadgeParams) => {
  try {
    const payload = updateBadgeParams.parse(input);
    await updateBadge(payload.id, payload);
    revalidateBadges();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeAction = async (input: BadgeId) => {
  try {
    const payload = badgeIdSchema.parse({ id: input });
    await deleteBadge(payload.id);
    revalidateBadges();
  } catch (e) {
    return handleErrors(e);
  }
};