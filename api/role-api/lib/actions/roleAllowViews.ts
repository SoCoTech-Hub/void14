"use server";

import { revalidatePath } from "next/cache";
import {
  createRoleAllowView,
  deleteRoleAllowView,
  updateRoleAllowView,
} from "@/lib/api/roleAllowViews/mutations";
import {
  RoleAllowViewId,
  NewRoleAllowViewParams,
  UpdateRoleAllowViewParams,
  roleAllowViewIdSchema,
  insertRoleAllowViewParams,
  updateRoleAllowViewParams,
} from "@/lib/db/schema/roleAllowViews";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleAllowViews = () => revalidatePath("/role-allow-views");

export const createRoleAllowViewAction = async (input: NewRoleAllowViewParams) => {
  try {
    const payload = insertRoleAllowViewParams.parse(input);
    await createRoleAllowView(payload);
    revalidateRoleAllowViews();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleAllowViewAction = async (input: UpdateRoleAllowViewParams) => {
  try {
    const payload = updateRoleAllowViewParams.parse(input);
    await updateRoleAllowView(payload.id, payload);
    revalidateRoleAllowViews();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleAllowViewAction = async (input: RoleAllowViewId) => {
  try {
    const payload = roleAllowViewIdSchema.parse({ id: input });
    await deleteRoleAllowView(payload.id);
    revalidateRoleAllowViews();
  } catch (e) {
    return handleErrors(e);
  }
};