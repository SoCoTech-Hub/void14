"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignFeedbackFile,
  deleteAssignFeedbackFile,
  updateAssignFeedbackFile,
} from "../api/assignFeedbackFiles/mutations";
import {
  AssignFeedbackFileId,
  assignFeedbackFileIdSchema,
  insertAssignFeedbackFileParams,
  NewAssignFeedbackFileParams,
  UpdateAssignFeedbackFileParams,
  updateAssignFeedbackFileParams,
} from "../db/schema/assignFeedbackFiles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackFiles = () =>
  revalidatePath("/assign-feedback-files");

export const createAssignFeedbackFileAction = async (
  input: NewAssignFeedbackFileParams,
) => {
  try {
    const payload = insertAssignFeedbackFileParams.parse(input);
    await createAssignFeedbackFile(payload);
    revalidateAssignFeedbackFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackFileAction = async (
  input: UpdateAssignFeedbackFileParams,
) => {
  try {
    const payload = updateAssignFeedbackFileParams.parse(input);
    await updateAssignFeedbackFile(payload.id, payload);
    revalidateAssignFeedbackFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackFileAction = async (
  input: AssignFeedbackFileId,
) => {
  try {
    const payload = assignFeedbackFileIdSchema.parse({ id: input });
    await deleteAssignFeedbackFile(payload.id);
    revalidateAssignFeedbackFiles();
  } catch (e) {
    return handleErrors(e);
  }
};
