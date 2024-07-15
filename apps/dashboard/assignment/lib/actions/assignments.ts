"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignment,
  deleteAssignment,
  updateAssignment,
} from "@/lib/api/assignments/mutations";
import {
  AssignmentId,
  NewAssignmentParams,
  UpdateAssignmentParams,
  assignmentIdSchema,
  insertAssignmentParams,
  updateAssignmentParams,
} from "@/lib/db/schema/assignments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignments = () => revalidatePath("/assignments");

export const createAssignmentAction = async (input: NewAssignmentParams) => {
  try {
    const payload = insertAssignmentParams.parse(input);
    await createAssignment(payload);
    revalidateAssignments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignmentAction = async (input: UpdateAssignmentParams) => {
  try {
    const payload = updateAssignmentParams.parse(input);
    await updateAssignment(payload.id, payload);
    revalidateAssignments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignmentAction = async (input: AssignmentId) => {
  try {
    const payload = assignmentIdSchema.parse({ id: input });
    await deleteAssignment(payload.id);
    revalidateAssignments();
  } catch (e) {
    return handleErrors(e);
  }
};
