"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignFeedbackEditpdfQuick,
  deleteAssignFeedbackEditpdfQuick,
  updateAssignFeedbackEditpdfQuick,
} from "../api/assignFeedbackEditpdfQuicks/mutations";
import {
  AssignFeedbackEditpdfQuickId,
  assignFeedbackEditpdfQuickIdSchema,
  insertAssignFeedbackEditpdfQuickParams,
  NewAssignFeedbackEditpdfQuickParams,
  UpdateAssignFeedbackEditpdfQuickParams,
  updateAssignFeedbackEditpdfQuickParams,
} from "../db/schema/assignFeedbackEditpdfQuicks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackEditpdfQuicks = () =>
  revalidatePath("/assign-feedback-editpdf-quicks");

export const createAssignFeedbackEditpdfQuickAction = async (
  input: NewAssignFeedbackEditpdfQuickParams,
) => {
  try {
    const payload = insertAssignFeedbackEditpdfQuickParams.parse(input);
    await createAssignFeedbackEditpdfQuick(payload);
    revalidateAssignFeedbackEditpdfQuicks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackEditpdfQuickAction = async (
  input: UpdateAssignFeedbackEditpdfQuickParams,
) => {
  try {
    const payload = updateAssignFeedbackEditpdfQuickParams.parse(input);
    await updateAssignFeedbackEditpdfQuick(payload.id, payload);
    revalidateAssignFeedbackEditpdfQuicks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackEditpdfQuickAction = async (
  input: AssignFeedbackEditpdfQuickId,
) => {
  try {
    const payload = assignFeedbackEditpdfQuickIdSchema.parse({ id: input });
    await deleteAssignFeedbackEditpdfQuick(payload.id);
    revalidateAssignFeedbackEditpdfQuicks();
  } catch (e) {
    return handleErrors(e);
  }
};
