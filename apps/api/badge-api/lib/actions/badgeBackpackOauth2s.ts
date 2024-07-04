"use server";

import { revalidatePath } from "next/cache";

import {
  createBadgeBackpackOauth2,
  deleteBadgeBackpackOauth2,
  updateBadgeBackpackOauth2,
} from "../api/badgeBackpackOauth2s/mutations";
import {
  BadgeBackpackOauth2Id,
  badgeBackpackOauth2IdSchema,
  insertBadgeBackpackOauth2Params,
  NewBadgeBackpackOauth2Params,
  UpdateBadgeBackpackOauth2Params,
  updateBadgeBackpackOauth2Params,
} from "../db/schema/badgeBackpackOauth2s";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeBackpackOauth2s = () =>
  revalidatePath("/badge-backpack-oauth2s");

export const createBadgeBackpackOauth2Action = async (
  input: NewBadgeBackpackOauth2Params,
) => {
  try {
    const payload = insertBadgeBackpackOauth2Params.parse(input);
    await createBadgeBackpackOauth2(payload);
    revalidateBadgeBackpackOauth2s();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeBackpackOauth2Action = async (
  input: UpdateBadgeBackpackOauth2Params,
) => {
  try {
    const payload = updateBadgeBackpackOauth2Params.parse(input);
    await updateBadgeBackpackOauth2(payload.id, payload);
    revalidateBadgeBackpackOauth2s();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeBackpackOauth2Action = async (
  input: BadgeBackpackOauth2Id,
) => {
  try {
    const payload = badgeBackpackOauth2IdSchema.parse({ id: input });
    await deleteBadgeBackpackOauth2(payload.id);
    revalidateBadgeBackpackOauth2s();
  } catch (e) {
    return handleErrors(e);
  }
};
