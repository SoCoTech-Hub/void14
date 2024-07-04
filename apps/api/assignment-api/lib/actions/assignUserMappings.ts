"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignUserMapping,
  deleteAssignUserMapping,
  updateAssignUserMapping,
} from "../api/assignUserMappings/mutations";
import {
  AssignUserMappingId,
  assignUserMappingIdSchema,
  insertAssignUserMappingParams,
  NewAssignUserMappingParams,
  UpdateAssignUserMappingParams,
  updateAssignUserMappingParams,
} from "../db/schema/assignUserMappings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignUserMappings = () =>
  revalidatePath("/assign-user-mappings");

export const createAssignUserMappingAction = async (
  input: NewAssignUserMappingParams,
) => {
  try {
    const payload = insertAssignUserMappingParams.parse(input);
    await createAssignUserMapping(payload);
    revalidateAssignUserMappings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignUserMappingAction = async (
  input: UpdateAssignUserMappingParams,
) => {
  try {
    const payload = updateAssignUserMappingParams.parse(input);
    await updateAssignUserMapping(payload.id, payload);
    revalidateAssignUserMappings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignUserMappingAction = async (
  input: AssignUserMappingId,
) => {
  try {
    const payload = assignUserMappingIdSchema.parse({ id: input });
    await deleteAssignUserMapping(payload.id);
    revalidateAssignUserMappings();
  } catch (e) {
    return handleErrors(e);
  }
};
