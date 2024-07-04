"use server";

import { revalidatePath } from "next/cache";

import {
  createRoleAllowOverride,
  deleteRoleAllowOverride,
  updateRoleAllowOverride,
} from "../api/roleAllowOverrides/mutations";
import {
  insertRoleAllowOverrideParams,
  NewRoleAllowOverrideParams,
  RoleAllowOverrideId,
  roleAllowOverrideIdSchema,
  UpdateRoleAllowOverrideParams,
  updateRoleAllowOverrideParams,
} from "../db/schema/roleAllowOverrides";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleAllowOverrides = () =>
  revalidatePath("/role-allow-overrides");

export const createRoleAllowOverrideAction = async (
  input: NewRoleAllowOverrideParams,
) => {
  try {
    const payload = insertRoleAllowOverrideParams.parse(input);
    await createRoleAllowOverride(payload);
    revalidateRoleAllowOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleAllowOverrideAction = async (
  input: UpdateRoleAllowOverrideParams,
) => {
  try {
    const payload = updateRoleAllowOverrideParams.parse(input);
    await updateRoleAllowOverride(payload.id, payload);
    revalidateRoleAllowOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleAllowOverrideAction = async (
  input: RoleAllowOverrideId,
) => {
  try {
    const payload = roleAllowOverrideIdSchema.parse({ id: input });
    await deleteRoleAllowOverride(payload.id);
    revalidateRoleAllowOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};
