"use server";

import { revalidatePath } from "next/cache";
import {
  createToolCohortRole,
  deleteToolCohortRole,
  updateToolCohortRole,
} from "@/lib/api/toolCohortRoles/mutations";
import {
  ToolCohortRoleId,
  NewToolCohortRoleParams,
  UpdateToolCohortRoleParams,
  toolCohortRoleIdSchema,
  insertToolCohortRoleParams,
  updateToolCohortRoleParams,
} from "@/lib/db/schema/toolCohortRoles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolCohortRoles = () => revalidatePath("/tool-cohort-roles");

export const createToolCohortRoleAction = async (input: NewToolCohortRoleParams) => {
  try {
    const payload = insertToolCohortRoleParams.parse(input);
    await createToolCohortRole(payload);
    revalidateToolCohortRoles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolCohortRoleAction = async (input: UpdateToolCohortRoleParams) => {
  try {
    const payload = updateToolCohortRoleParams.parse(input);
    await updateToolCohortRole(payload.id, payload);
    revalidateToolCohortRoles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolCohortRoleAction = async (input: ToolCohortRoleId) => {
  try {
    const payload = toolCohortRoleIdSchema.parse({ id: input });
    await deleteToolCohortRole(payload.id);
    revalidateToolCohortRoles();
  } catch (e) {
    return handleErrors(e);
  }
};