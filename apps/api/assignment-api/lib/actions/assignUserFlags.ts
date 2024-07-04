"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignUserFlag,
  deleteAssignUserFlag,
  updateAssignUserFlag,
} from "../api/assignUserFlags/mutations";
import {
  AssignUserFlagId,
  assignUserFlagIdSchema,
  insertAssignUserFlagParams,
  NewAssignUserFlagParams,
  UpdateAssignUserFlagParams,
  updateAssignUserFlagParams,
} from "../db/schema/assignUserFlags";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignUserFlags = () => revalidatePath("/assign-user-flags");

export const createAssignUserFlagAction = async (
  input: NewAssignUserFlagParams,
) => {
  try {
    const payload = insertAssignUserFlagParams.parse(input);
    await createAssignUserFlag(payload);
    revalidateAssignUserFlags();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignUserFlagAction = async (
  input: UpdateAssignUserFlagParams,
) => {
  try {
    const payload = updateAssignUserFlagParams.parse(input);
    await updateAssignUserFlag(payload.id, payload);
    revalidateAssignUserFlags();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignUserFlagAction = async (input: AssignUserFlagId) => {
  try {
    const payload = assignUserFlagIdSchema.parse({ id: input });
    await deleteAssignUserFlag(payload.id);
    revalidateAssignUserFlags();
  } catch (e) {
    return handleErrors(e);
  }
};
