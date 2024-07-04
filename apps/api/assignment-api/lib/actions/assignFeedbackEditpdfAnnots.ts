"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignFeedbackEditpdfAnnot,
  deleteAssignFeedbackEditpdfAnnot,
  updateAssignFeedbackEditpdfAnnot,
} from "../api/assignFeedbackEditpdfAnnots/mutations";
import {
  AssignFeedbackEditpdfAnnotId,
  assignFeedbackEditpdfAnnotIdSchema,
  insertAssignFeedbackEditpdfAnnotParams,
  NewAssignFeedbackEditpdfAnnotParams,
  UpdateAssignFeedbackEditpdfAnnotParams,
  updateAssignFeedbackEditpdfAnnotParams,
} from "../db/schema/assignFeedbackEditpdfAnnots";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackEditpdfAnnots = () =>
  revalidatePath("/assign-feedback-editpdf-annots");

export const createAssignFeedbackEditpdfAnnotAction = async (
  input: NewAssignFeedbackEditpdfAnnotParams,
) => {
  try {
    const payload = insertAssignFeedbackEditpdfAnnotParams.parse(input);
    await createAssignFeedbackEditpdfAnnot(payload);
    revalidateAssignFeedbackEditpdfAnnots();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackEditpdfAnnotAction = async (
  input: UpdateAssignFeedbackEditpdfAnnotParams,
) => {
  try {
    const payload = updateAssignFeedbackEditpdfAnnotParams.parse(input);
    await updateAssignFeedbackEditpdfAnnot(payload.id, payload);
    revalidateAssignFeedbackEditpdfAnnots();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackEditpdfAnnotAction = async (
  input: AssignFeedbackEditpdfAnnotId,
) => {
  try {
    const payload = assignFeedbackEditpdfAnnotIdSchema.parse({ id: input });
    await deleteAssignFeedbackEditpdfAnnot(payload.id);
    revalidateAssignFeedbackEditpdfAnnots();
  } catch (e) {
    return handleErrors(e);
  }
};
