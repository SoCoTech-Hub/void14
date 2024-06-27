"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeEndorsement,
  deleteBadgeEndorsement,
  updateBadgeEndorsement,
} from "@/lib/api/badgeEndorsements/mutations";
import {
  BadgeEndorsementId,
  NewBadgeEndorsementParams,
  UpdateBadgeEndorsementParams,
  badgeEndorsementIdSchema,
  insertBadgeEndorsementParams,
  updateBadgeEndorsementParams,
} from "@/lib/db/schema/badgeEndorsements";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeEndorsements = () => revalidatePath("/badge-endorsements");

export const createBadgeEndorsementAction = async (input: NewBadgeEndorsementParams) => {
  try {
    const payload = insertBadgeEndorsementParams.parse(input);
    await createBadgeEndorsement(payload);
    revalidateBadgeEndorsements();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeEndorsementAction = async (input: UpdateBadgeEndorsementParams) => {
  try {
    const payload = updateBadgeEndorsementParams.parse(input);
    await updateBadgeEndorsement(payload.id, payload);
    revalidateBadgeEndorsements();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeEndorsementAction = async (input: BadgeEndorsementId) => {
  try {
    const payload = badgeEndorsementIdSchema.parse({ id: input });
    await deleteBadgeEndorsement(payload.id);
    revalidateBadgeEndorsements();
  } catch (e) {
    return handleErrors(e);
  }
};