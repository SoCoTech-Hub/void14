"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeExternalBackpack,
  deleteBadgeExternalBackpack,
  updateBadgeExternalBackpack,
} from "@/lib/api/badgeExternalBackpacks/mutations";
import {
  BadgeExternalBackpackId,
  NewBadgeExternalBackpackParams,
  UpdateBadgeExternalBackpackParams,
  badgeExternalBackpackIdSchema,
  insertBadgeExternalBackpackParams,
  updateBadgeExternalBackpackParams,
} from "@/lib/db/schema/badgeExternalBackpacks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeExternalBackpacks = () => revalidatePath("/badge-external-backpacks");

export const createBadgeExternalBackpackAction = async (input: NewBadgeExternalBackpackParams) => {
  try {
    const payload = insertBadgeExternalBackpackParams.parse(input);
    await createBadgeExternalBackpack(payload);
    revalidateBadgeExternalBackpacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeExternalBackpackAction = async (input: UpdateBadgeExternalBackpackParams) => {
  try {
    const payload = updateBadgeExternalBackpackParams.parse(input);
    await updateBadgeExternalBackpack(payload.id, payload);
    revalidateBadgeExternalBackpacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeExternalBackpackAction = async (input: BadgeExternalBackpackId) => {
  try {
    const payload = badgeExternalBackpackIdSchema.parse({ id: input });
    await deleteBadgeExternalBackpack(payload.id);
    revalidateBadgeExternalBackpacks();
  } catch (e) {
    return handleErrors(e);
  }
};