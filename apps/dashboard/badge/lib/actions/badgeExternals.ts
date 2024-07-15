"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeExternal,
  deleteBadgeExternal,
  updateBadgeExternal,
} from "@/lib/api/badgeExternals/mutations";
import {
  BadgeExternalId,
  NewBadgeExternalParams,
  UpdateBadgeExternalParams,
  badgeExternalIdSchema,
  insertBadgeExternalParams,
  updateBadgeExternalParams,
} from "@/lib/db/schema/badgeExternals";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeExternals = () => revalidatePath("/badge-externals");

export const createBadgeExternalAction = async (input: NewBadgeExternalParams) => {
  try {
    const payload = insertBadgeExternalParams.parse(input);
    await createBadgeExternal(payload);
    revalidateBadgeExternals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeExternalAction = async (input: UpdateBadgeExternalParams) => {
  try {
    const payload = updateBadgeExternalParams.parse(input);
    await updateBadgeExternal(payload.id, payload);
    revalidateBadgeExternals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeExternalAction = async (input: BadgeExternalId) => {
  try {
    const payload = badgeExternalIdSchema.parse({ id: input });
    await deleteBadgeExternal(payload.id);
    revalidateBadgeExternals();
  } catch (e) {
    return handleErrors(e);
  }
};
