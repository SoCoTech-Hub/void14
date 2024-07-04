"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignmentSubmission,
  deleteAssignmentSubmission,
  updateAssignmentSubmission,
} from "../api/assignmentSubmissions/mutations";
import {
  AssignmentSubmissionId,
  assignmentSubmissionIdSchema,
  insertAssignmentSubmissionParams,
  NewAssignmentSubmissionParams,
  UpdateAssignmentSubmissionParams,
  updateAssignmentSubmissionParams,
} from "../db/schema/assignmentSubmissions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignmentSubmissions = () =>
  revalidatePath("/assignment-submissions");

export const createAssignmentSubmissionAction = async (
  input: NewAssignmentSubmissionParams,
) => {
  try {
    const payload = insertAssignmentSubmissionParams.parse(input);
    await createAssignmentSubmission(payload);
    revalidateAssignmentSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignmentSubmissionAction = async (
  input: UpdateAssignmentSubmissionParams,
) => {
  try {
    const payload = updateAssignmentSubmissionParams.parse(input);
    await updateAssignmentSubmission(payload.id, payload);
    revalidateAssignmentSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignmentSubmissionAction = async (
  input: AssignmentSubmissionId,
) => {
  try {
    const payload = assignmentSubmissionIdSchema.parse({ id: input });
    await deleteAssignmentSubmission(payload.id);
    revalidateAssignmentSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};
