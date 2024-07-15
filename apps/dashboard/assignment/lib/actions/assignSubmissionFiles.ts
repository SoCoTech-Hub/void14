"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignSubmissionFile,
  deleteAssignSubmissionFile,
  updateAssignSubmissionFile,
} from "@/lib/api/assignSubmissionFiles/mutations";
import {
  AssignSubmissionFileId,
  NewAssignSubmissionFileParams,
  UpdateAssignSubmissionFileParams,
  assignSubmissionFileIdSchema,
  insertAssignSubmissionFileParams,
  updateAssignSubmissionFileParams,
} from "@/lib/db/schema/assignSubmissionFiles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignSubmissionFiles = () => revalidatePath("/assign-submission-files");

export const createAssignSubmissionFileAction = async (input: NewAssignSubmissionFileParams) => {
  try {
    const payload = insertAssignSubmissionFileParams.parse(input);
    await createAssignSubmissionFile(payload);
    revalidateAssignSubmissionFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignSubmissionFileAction = async (input: UpdateAssignSubmissionFileParams) => {
  try {
    const payload = updateAssignSubmissionFileParams.parse(input);
    await updateAssignSubmissionFile(payload.id, payload);
    revalidateAssignSubmissionFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignSubmissionFileAction = async (input: AssignSubmissionFileId) => {
  try {
    const payload = assignSubmissionFileIdSchema.parse({ id: input });
    await deleteAssignSubmissionFile(payload.id);
    revalidateAssignSubmissionFiles();
  } catch (e) {
    return handleErrors(e);
  }
};
