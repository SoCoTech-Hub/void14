"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignSubmission,
  deleteAssignSubmission,
  updateAssignSubmission,
} from "@/lib/api/assignSubmissions/mutations";
import {
  AssignSubmissionId,
  NewAssignSubmissionParams,
  UpdateAssignSubmissionParams,
  assignSubmissionIdSchema,
  insertAssignSubmissionParams,
  updateAssignSubmissionParams,
} from "@/lib/db/schema/assignSubmissions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignSubmissions = () => revalidatePath("/assign-submissions");

export const createAssignSubmissionAction = async (input: NewAssignSubmissionParams) => {
  try {
    const payload = insertAssignSubmissionParams.parse(input);
    await createAssignSubmission(payload);
    revalidateAssignSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignSubmissionAction = async (input: UpdateAssignSubmissionParams) => {
  try {
    const payload = updateAssignSubmissionParams.parse(input);
    await updateAssignSubmission(payload.id, payload);
    revalidateAssignSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignSubmissionAction = async (input: AssignSubmissionId) => {
  try {
    const payload = assignSubmissionIdSchema.parse({ id: input });
    await deleteAssignSubmission(payload.id);
    revalidateAssignSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};
