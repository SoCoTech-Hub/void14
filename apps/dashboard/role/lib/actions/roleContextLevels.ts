"use server";

import { revalidatePath } from "next/cache";
import {
  createRoleContextLevel,
  deleteRoleContextLevel,
  updateRoleContextLevel,
} from "@/lib/api/roleContextLevels/mutations";
import {
  RoleContextLevelId,
  NewRoleContextLevelParams,
  UpdateRoleContextLevelParams,
  roleContextLevelIdSchema,
  insertRoleContextLevelParams,
  updateRoleContextLevelParams,
} from "@/lib/db/schema/roleContextLevels";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRoleContextLevels = () => revalidatePath("/role-context-levels");

export const createRoleContextLevelAction = async (input: NewRoleContextLevelParams) => {
  try {
    const payload = insertRoleContextLevelParams.parse(input);
    await createRoleContextLevel(payload);
    revalidateRoleContextLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRoleContextLevelAction = async (input: UpdateRoleContextLevelParams) => {
  try {
    const payload = updateRoleContextLevelParams.parse(input);
    await updateRoleContextLevel(payload.id, payload);
    revalidateRoleContextLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRoleContextLevelAction = async (input: RoleContextLevelId) => {
  try {
    const payload = roleContextLevelIdSchema.parse({ id: input });
    await deleteRoleContextLevel(payload.id);
    revalidateRoleContextLevels();
  } catch (e) {
    return handleErrors(e);
  }
};
