"use server";

import { revalidatePath } from "next/cache";

import {
  createGroupingsGroup,
  deleteGroupingsGroup,
  updateGroupingsGroup,
} from "../api/groupingsGroups/mutations";
import {
  GroupingsGroupId,
  groupingsGroupIdSchema,
  insertGroupingsGroupParams,
  NewGroupingsGroupParams,
  UpdateGroupingsGroupParams,
  updateGroupingsGroupParams,
} from "../db/schema/groupingsGroups";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGroupingsGroups = () => revalidatePath("/groupings-groups");

export const createGroupingsGroupAction = async (
  input: NewGroupingsGroupParams,
) => {
  try {
    const payload = insertGroupingsGroupParams.parse(input);
    await createGroupingsGroup(payload);
    revalidateGroupingsGroups();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGroupingsGroupAction = async (
  input: UpdateGroupingsGroupParams,
) => {
  try {
    const payload = updateGroupingsGroupParams.parse(input);
    await updateGroupingsGroup(payload.id, payload);
    revalidateGroupingsGroups();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGroupingsGroupAction = async (input: GroupingsGroupId) => {
  try {
    const payload = groupingsGroupIdSchema.parse({ id: input });
    await deleteGroupingsGroup(payload.id);
    revalidateGroupingsGroups();
  } catch (e) {
    return handleErrors(e);
  }
};
