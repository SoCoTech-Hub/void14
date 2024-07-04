"use server";

import { revalidatePath } from "next/cache";

import {
  createBadgeExternalIdentifier,
  deleteBadgeExternalIdentifier,
  updateBadgeExternalIdentifier,
} from "../api/badgeExternalIdentifiers/mutations";
import {
  BadgeExternalIdentifierId,
  badgeExternalIdentifierIdSchema,
  insertBadgeExternalIdentifierParams,
  NewBadgeExternalIdentifierParams,
  UpdateBadgeExternalIdentifierParams,
  updateBadgeExternalIdentifierParams,
} from "../db/schema/badgeExternalIdentifiers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeExternalIdentifiers = () =>
  revalidatePath("/badge-external-identifiers");

export const createBadgeExternalIdentifierAction = async (
  input: NewBadgeExternalIdentifierParams,
) => {
  try {
    const payload = insertBadgeExternalIdentifierParams.parse(input);
    await createBadgeExternalIdentifier(payload);
    revalidateBadgeExternalIdentifiers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeExternalIdentifierAction = async (
  input: UpdateBadgeExternalIdentifierParams,
) => {
  try {
    const payload = updateBadgeExternalIdentifierParams.parse(input);
    await updateBadgeExternalIdentifier(payload.id, payload);
    revalidateBadgeExternalIdentifiers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeExternalIdentifierAction = async (
  input: BadgeExternalIdentifierId,
) => {
  try {
    const payload = badgeExternalIdentifierIdSchema.parse({ id: input });
    await deleteBadgeExternalIdentifier(payload.id);
    revalidateBadgeExternalIdentifiers();
  } catch (e) {
    return handleErrors(e);
  }
};
