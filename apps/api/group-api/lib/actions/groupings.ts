"use server";

import { revalidatePath } from "next/cache";
import {
  createGrouping,
  deleteGrouping,
  updateGrouping,
} from "@/lib/api/groupings/mutations";
import {
  GroupingId,
  NewGroupingParams,
  UpdateGroupingParams,
  groupingIdSchema,
  insertGroupingParams,
  updateGroupingParams,
} from "@/lib/db/schema/groupings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGroupings = () => revalidatePath("/groupings");

export const createGroupingAction = async (input: NewGroupingParams) => {
  try {
    const payload = insertGroupingParams.parse(input);
    await createGrouping(payload);
    revalidateGroupings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGroupingAction = async (input: UpdateGroupingParams) => {
  try {
    const payload = updateGroupingParams.parse(input);
    await updateGrouping(payload.id, payload);
    revalidateGroupings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGroupingAction = async (input: GroupingId) => {
  try {
    const payload = groupingIdSchema.parse({ id: input });
    await deleteGrouping(payload.id);
    revalidateGroupings();
  } catch (e) {
    return handleErrors(e);
  }
};