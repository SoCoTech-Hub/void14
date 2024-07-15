"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignOverride,
  deleteAssignOverride,
  updateAssignOverride,
} from "@/lib/api/assignOverrides/mutations";
import {
  AssignOverrideId,
  NewAssignOverrideParams,
  UpdateAssignOverrideParams,
  assignOverrideIdSchema,
  insertAssignOverrideParams,
  updateAssignOverrideParams,
} from "@/lib/db/schema/assignOverrides";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignOverrides = () => revalidatePath("/assign-overrides");

export const createAssignOverrideAction = async (input: NewAssignOverrideParams) => {
  try {
    const payload = insertAssignOverrideParams.parse(input);
    await createAssignOverride(payload);
    revalidateAssignOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignOverrideAction = async (input: UpdateAssignOverrideParams) => {
  try {
    const payload = updateAssignOverrideParams.parse(input);
    await updateAssignOverride(payload.id, payload);
    revalidateAssignOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignOverrideAction = async (input: AssignOverrideId) => {
  try {
    const payload = assignOverrideIdSchema.parse({ id: input });
    await deleteAssignOverride(payload.id);
    revalidateAssignOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};
