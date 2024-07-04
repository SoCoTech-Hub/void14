"use server";

import { revalidatePath } from "next/cache";

import {
  createRoleName,
  deleteRoleName,
  updateRoleName,
} from "../api/roleNames/mutations";
import {
  insertRoleNameParams,
  NewRoleNameParams,
  RoleNameId,
  roleNameIdSchema,
  UpdateRoleNameParams,
  updateRoleNameParams,
} from "../db/schema/roleNames";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleNames = () => revalidatePath("/role-names");

export const createRoleNameAction = async (input: NewRoleNameParams) => {
  try {
    const payload = insertRoleNameParams.parse(input);
    await createRoleName(payload);
    revalidateRoleNames();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleNameAction = async (input: UpdateRoleNameParams) => {
  try {
    const payload = updateRoleNameParams.parse(input);
    await updateRoleName(payload.id, payload);
    revalidateRoleNames();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleNameAction = async (input: RoleNameId) => {
  try {
    const payload = roleNameIdSchema.parse({ id: input });
    await deleteRoleName(payload.id);
    revalidateRoleNames();
  } catch (e) {
    return handleErrors(e);
  }
};
