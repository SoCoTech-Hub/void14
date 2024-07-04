"use server";

import { revalidatePath } from "next/cache";

import {
  createToolDataprivacyPurposeRole,
  deleteToolDataprivacyPurposeRole,
  updateToolDataprivacyPurposeRole,
} from "../api/toolDataprivacyPurposeRoles/mutations";
import {
  insertToolDataprivacyPurposeRoleParams,
  NewToolDataprivacyPurposeRoleParams,
  ToolDataprivacyPurposeRoleId,
  toolDataprivacyPurposeRoleIdSchema,
  UpdateToolDataprivacyPurposeRoleParams,
  updateToolDataprivacyPurposeRoleParams,
} from "../db/schema/toolDataprivacyPurposeRoles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyPurposeRoles = () =>
  revalidatePath("/tool-dataprivacy-purpose-roles");

export const createToolDataprivacyPurposeRoleAction = async (
  input: NewToolDataprivacyPurposeRoleParams,
) => {
  try {
    const payload = insertToolDataprivacyPurposeRoleParams.parse(input);
    await createToolDataprivacyPurposeRole(payload);
    revalidateToolDataprivacyPurposeRoles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyPurposeRoleAction = async (
  input: UpdateToolDataprivacyPurposeRoleParams,
) => {
  try {
    const payload = updateToolDataprivacyPurposeRoleParams.parse(input);
    await updateToolDataprivacyPurposeRole(payload.id, payload);
    revalidateToolDataprivacyPurposeRoles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyPurposeRoleAction = async (
  input: ToolDataprivacyPurposeRoleId,
) => {
  try {
    const payload = toolDataprivacyPurposeRoleIdSchema.parse({ id: input });
    await deleteToolDataprivacyPurposeRole(payload.id);
    revalidateToolDataprivacyPurposeRoles();
  } catch (e) {
    return handleErrors(e);
  }
};
