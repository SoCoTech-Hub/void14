"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignFeedbackEditpdfCmnt,
  deleteAssignFeedbackEditpdfCmnt,
  updateAssignFeedbackEditpdfCmnt,
} from "@/lib/api/assignFeedbackEditpdfCmnts/mutations";
import {
  AssignFeedbackEditpdfCmntId,
  NewAssignFeedbackEditpdfCmntParams,
  UpdateAssignFeedbackEditpdfCmntParams,
  assignFeedbackEditpdfCmntIdSchema,
  insertAssignFeedbackEditpdfCmntParams,
  updateAssignFeedbackEditpdfCmntParams,
} from "@/lib/db/schema/assignFeedbackEditpdfCmnts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackEditpdfCmnts = () => revalidatePath("/assign-feedback-editpdf-cmnts");

export const createAssignFeedbackEditpdfCmntAction = async (input: NewAssignFeedbackEditpdfCmntParams) => {
  try {
    const payload = insertAssignFeedbackEditpdfCmntParams.parse(input);
    await createAssignFeedbackEditpdfCmnt(payload);
    revalidateAssignFeedbackEditpdfCmnts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackEditpdfCmntAction = async (input: UpdateAssignFeedbackEditpdfCmntParams) => {
  try {
    const payload = updateAssignFeedbackEditpdfCmntParams.parse(input);
    await updateAssignFeedbackEditpdfCmnt(payload.id, payload);
    revalidateAssignFeedbackEditpdfCmnts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackEditpdfCmntAction = async (input: AssignFeedbackEditpdfCmntId) => {
  try {
    const payload = assignFeedbackEditpdfCmntIdSchema.parse({ id: input });
    await deleteAssignFeedbackEditpdfCmnt(payload.id);
    revalidateAssignFeedbackEditpdfCmnts();
  } catch (e) {
    return handleErrors(e);
  }
};