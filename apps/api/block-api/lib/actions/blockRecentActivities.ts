"use server";

import { revalidatePath } from "next/cache";

import {
  createBlockRecentActivity,
  deleteBlockRecentActivity,
  updateBlockRecentActivity,
} from "../api/blockRecentActivities/mutations";
import {
  BlockRecentActivityId,
  blockRecentActivityIdSchema,
  insertBlockRecentActivityParams,
  NewBlockRecentActivityParams,
  UpdateBlockRecentActivityParams,
  updateBlockRecentActivityParams,
} from "../db/schema/blockRecentActivities";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlockRecentActivities = () =>
  revalidatePath("/block-recent-activities");

export const createBlockRecentActivityAction = async (
  input: NewBlockRecentActivityParams,
) => {
  try {
    const payload = insertBlockRecentActivityParams.parse(input);
    await createBlockRecentActivity(payload);
    revalidateBlockRecentActivities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlockRecentActivityAction = async (
  input: UpdateBlockRecentActivityParams,
) => {
  try {
    const payload = updateBlockRecentActivityParams.parse(input);
    await updateBlockRecentActivity(payload.id, payload);
    revalidateBlockRecentActivities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlockRecentActivityAction = async (
  input: BlockRecentActivityId,
) => {
  try {
    const payload = blockRecentActivityIdSchema.parse({ id: input });
    await deleteBlockRecentActivity(payload.id);
    revalidateBlockRecentActivities();
  } catch (e) {
    return handleErrors(e);
  }
};
