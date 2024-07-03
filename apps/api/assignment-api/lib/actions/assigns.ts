"use server";

import { revalidatePath } from "next/cache";
import {
  createAssign,
  deleteAssign,
  updateAssign,
} from "@/lib/api/assigns/mutations";
import {
  AssignId,
  NewAssignParams,
  UpdateAssignParams,
  assignIdSchema,
  insertAssignParams,
  updateAssignParams,
} from "@/lib/db/schema/assigns";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssigns = () => revalidatePath("/assigns");

export const createAssignAction = async (input: NewAssignParams) => {
  try {
    const payload = insertAssignParams.parse(input);
    await createAssign(payload);
    revalidateAssigns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignAction = async (input: UpdateAssignParams) => {
  try {
    const payload = updateAssignParams.parse(input);
    await updateAssign(payload.id, payload);
    revalidateAssigns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignAction = async (input: AssignId) => {
  try {
    const payload = assignIdSchema.parse({ id: input });
    await deleteAssign(payload.id);
    revalidateAssigns();
  } catch (e) {
    return handleErrors(e);
  }
};