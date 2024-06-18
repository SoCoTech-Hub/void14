"use server";

import { revalidatePath } from "next/cache";
import {
  createRoleAllowSwitch,
  deleteRoleAllowSwitch,
  updateRoleAllowSwitch,
} from "@/lib/api/roleAllowSwitches/mutations";
import {
  RoleAllowSwitchId,
  NewRoleAllowSwitchParams,
  UpdateRoleAllowSwitchParams,
  roleAllowSwitchIdSchema,
  insertRoleAllowSwitchParams,
  updateRoleAllowSwitchParams,
} from "@/lib/db/schema/roleAllowSwitches";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleAllowSwitches = () => revalidatePath("/role-allow-switches");

export const createRoleAllowSwitchAction = async (input: NewRoleAllowSwitchParams) => {
  try {
    const payload = insertRoleAllowSwitchParams.parse(input);
    await createRoleAllowSwitch(payload);
    revalidateRoleAllowSwitches();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleAllowSwitchAction = async (input: UpdateRoleAllowSwitchParams) => {
  try {
    const payload = updateRoleAllowSwitchParams.parse(input);
    await updateRoleAllowSwitch(payload.id, payload);
    revalidateRoleAllowSwitches();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleAllowSwitchAction = async (input: RoleAllowSwitchId) => {
  try {
    const payload = roleAllowSwitchIdSchema.parse({ id: input });
    await deleteRoleAllowSwitch(payload.id);
    revalidateRoleAllowSwitches();
  } catch (e) {
    return handleErrors(e);
  }
};