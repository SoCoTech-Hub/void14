"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeBackpack,
  deleteBadgeBackpack,
  updateBadgeBackpack,
} from "@/lib/api/badgeBackpacks/mutations";
import {
  BadgeBackpackId,
  NewBadgeBackpackParams,
  UpdateBadgeBackpackParams,
  badgeBackpackIdSchema,
  insertBadgeBackpackParams,
  updateBadgeBackpackParams,
} from "@/lib/db/schema/badgeBackpacks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeBackpacks = () => revalidatePath("/badge-backpacks");

export const createBadgeBackpackAction = async (input: NewBadgeBackpackParams) => {
  try {
    const payload = insertBadgeBackpackParams.parse(input);
    await createBadgeBackpack(payload);
    revalidateBadgeBackpacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeBackpackAction = async (input: UpdateBadgeBackpackParams) => {
  try {
    const payload = updateBadgeBackpackParams.parse(input);
    await updateBadgeBackpack(payload.id, payload);
    revalidateBadgeBackpacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeBackpackAction = async (input: BadgeBackpackId) => {
  try {
    const payload = badgeBackpackIdSchema.parse({ id: input });
    await deleteBadgeBackpack(payload.id);
    revalidateBadgeBackpacks();
  } catch (e) {
    return handleErrors(e);
  }
};
