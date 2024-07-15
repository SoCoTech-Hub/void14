"use server";

import { revalidatePath } from "next/cache";
import {
  createRoleCapability,
  deleteRoleCapability,
  updateRoleCapability,
} from "@/lib/api/roleCapabilities/mutations";
import {
  RoleCapabilityId,
  NewRoleCapabilityParams,
  UpdateRoleCapabilityParams,
  roleCapabilityIdSchema,
  insertRoleCapabilityParams,
  updateRoleCapabilityParams,
} from "@/lib/db/schema/roleCapabilities";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleCapabilities = () => revalidatePath("/role-capabilities");

export const createRoleCapabilityAction = async (input: NewRoleCapabilityParams) => {
  try {
    const payload = insertRoleCapabilityParams.parse(input);
    await createRoleCapability(payload);
    revalidateRoleCapabilities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleCapabilityAction = async (input: UpdateRoleCapabilityParams) => {
  try {
    const payload = updateRoleCapabilityParams.parse(input);
    await updateRoleCapability(payload.id, payload);
    revalidateRoleCapabilities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleCapabilityAction = async (input: RoleCapabilityId) => {
  try {
    const payload = roleCapabilityIdSchema.parse({ id: input });
    await deleteRoleCapability(payload.id);
    revalidateRoleCapabilities();
  } catch (e) {
    return handleErrors(e);
  }
};
