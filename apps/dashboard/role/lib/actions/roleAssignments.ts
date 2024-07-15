"use server";

import { revalidatePath } from "next/cache";
import {
  createRoleAssignment,
  deleteRoleAssignment,
  updateRoleAssignment,
} from "@/lib/api/roleAssignments/mutations";
import {
  RoleAssignmentId,
  NewRoleAssignmentParams,
  UpdateRoleAssignmentParams,
  roleAssignmentIdSchema,
  insertRoleAssignmentParams,
  updateRoleAssignmentParams,
} from "@/lib/db/schema/roleAssignments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleAssignments = () => revalidatePath("/role-assignments");

export const createRoleAssignmentAction = async (input: NewRoleAssignmentParams) => {
  try {
    const payload = insertRoleAssignmentParams.parse(input);
    await createRoleAssignment(payload);
    revalidateRoleAssignments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleAssignmentAction = async (input: UpdateRoleAssignmentParams) => {
  try {
    const payload = updateRoleAssignmentParams.parse(input);
    await updateRoleAssignment(payload.id, payload);
    revalidateRoleAssignments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleAssignmentAction = async (input: RoleAssignmentId) => {
  try {
    const payload = roleAssignmentIdSchema.parse({ id: input });
    await deleteRoleAssignment(payload.id);
    revalidateRoleAssignments();
  } catch (e) {
    return handleErrors(e);
  }
};
