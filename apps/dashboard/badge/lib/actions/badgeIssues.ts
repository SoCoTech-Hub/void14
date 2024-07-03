"use server";

import { revalidatePath } from "next/cache";
import {
  createBadgeIssue,
  deleteBadgeIssue,
  updateBadgeIssue,
} from "@/lib/api/badgeIssues/mutations";
import {
  BadgeIssueId,
  NewBadgeIssueParams,
  UpdateBadgeIssueParams,
  badgeIssueIdSchema,
  insertBadgeIssueParams,
  updateBadgeIssueParams,
} from "@/lib/db/schema/badgeIssues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBadgeIssues = () => revalidatePath("/badge-issues");

export const createBadgeIssueAction = async (input: NewBadgeIssueParams) => {
  try {
    const payload = insertBadgeIssueParams.parse(input);
    await createBadgeIssue(payload);
    revalidateBadgeIssues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBadgeIssueAction = async (input: UpdateBadgeIssueParams) => {
  try {
    const payload = updateBadgeIssueParams.parse(input);
    await updateBadgeIssue(payload.id, payload);
    revalidateBadgeIssues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBadgeIssueAction = async (input: BadgeIssueId) => {
  try {
    const payload = badgeIssueIdSchema.parse({ id: input });
    await deleteBadgeIssue(payload.id);
    revalidateBadgeIssues();
  } catch (e) {
    return handleErrors(e);
  }
};