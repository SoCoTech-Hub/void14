"use server";

import { revalidatePath } from "next/cache";
import {
  createRole,
  deleteRole,
  updateRole,
} from "@/lib/api/roles/mutations";
import {
  RoleId,
  NewRoleParams,
  UpdateRoleParams,
  roleIdSchema,
  insertRoleParams,
  updateRoleParams,
} from "@/lib/db/schema/roles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoles = () => revalidatePath("/roles");

export const createRoleAction = async (input: NewRoleParams) => {
  try {
    const payload = insertRoleParams.parse(input);
    await createRole(payload);
    revalidateRoles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleAction = async (input: UpdateRoleParams) => {
  try {
    const payload = updateRoleParams.parse(input);
    await updateRole(payload.id, payload);
    revalidateRoles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleAction = async (input: RoleId) => {
  try {
    const payload = roleIdSchema.parse({ id: input });
    await deleteRole(payload.id);
    revalidateRoles();
  } catch (e) {
    return handleErrors(e);
  }
};