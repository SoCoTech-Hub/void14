"use server";

import { revalidatePath } from "next/cache";
import {
  createRoleAllowAssign,
  deleteRoleAllowAssign,
  updateRoleAllowAssign,
} from "@/lib/api/roleAllowAssigns/mutations";
import {
  RoleAllowAssignId,
  NewRoleAllowAssignParams,
  UpdateRoleAllowAssignParams,
  roleAllowAssignIdSchema,
  insertRoleAllowAssignParams,
  updateRoleAllowAssignParams,
} from "@/lib/db/schema/roleAllowAssigns";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleAllowAssigns = () => revalidatePath("/role-allow-assigns");

export const createRoleAllowAssignAction = async (input: NewRoleAllowAssignParams) => {
  try {
    const payload = insertRoleAllowAssignParams.parse(input);
    await createRoleAllowAssign(payload);
    revalidateRoleAllowAssigns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleAllowAssignAction = async (input: UpdateRoleAllowAssignParams) => {
  try {
    const payload = updateRoleAllowAssignParams.parse(input);
    await updateRoleAllowAssign(payload.id, payload);
    revalidateRoleAllowAssigns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleAllowAssignAction = async (input: RoleAllowAssignId) => {
  try {
    const payload = roleAllowAssignIdSchema.parse({ id: input });
    await deleteRoleAllowAssign(payload.id);
    revalidateRoleAllowAssigns();
  } catch (e) {
    return handleErrors(e);
  }
};
