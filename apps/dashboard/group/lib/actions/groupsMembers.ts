"use server";

import { revalidatePath } from "next/cache";
import {
  createGroupsMember,
  deleteGroupsMember,
  updateGroupsMember,
} from "@/lib/api/groupsMembers/mutations";
import {
  GroupsMemberId,
  NewGroupsMemberParams,
  UpdateGroupsMemberParams,
  groupsMemberIdSchema,
  insertGroupsMemberParams,
  updateGroupsMemberParams,
} from "@/lib/db/schema/groupsMembers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGroupsMembers = () => revalidatePath("/groups-members");

export const createGroupsMemberAction = async (input: NewGroupsMemberParams) => {
  try {
    const payload = insertGroupsMemberParams.parse(input);
    await createGroupsMember(payload);
    revalidateGroupsMembers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGroupsMemberAction = async (input: UpdateGroupsMemberParams) => {
  try {
    const payload = updateGroupsMemberParams.parse(input);
    await updateGroupsMember(payload.id, payload);
    revalidateGroupsMembers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGroupsMemberAction = async (input: GroupsMemberId) => {
  try {
    const payload = groupsMemberIdSchema.parse({ id: input });
    await deleteGroupsMember(payload.id);
    revalidateGroupsMembers();
  } catch (e) {
    return handleErrors(e);
  }
};
