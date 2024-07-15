"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignFeedbackEditpdfRot,
  deleteAssignFeedbackEditpdfRot,
  updateAssignFeedbackEditpdfRot,
} from "@/lib/api/assignFeedbackEditpdfRots/mutations";
import {
  AssignFeedbackEditpdfRotId,
  NewAssignFeedbackEditpdfRotParams,
  UpdateAssignFeedbackEditpdfRotParams,
  assignFeedbackEditpdfRotIdSchema,
  insertAssignFeedbackEditpdfRotParams,
  updateAssignFeedbackEditpdfRotParams,
} from "@/lib/db/schema/assignFeedbackEditpdfRots";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackEditpdfRots = () => revalidatePath("/assign-feedback-editpdf-rots");

export const createAssignFeedbackEditpdfRotAction = async (input: NewAssignFeedbackEditpdfRotParams) => {
  try {
    const payload = insertAssignFeedbackEditpdfRotParams.parse(input);
    await createAssignFeedbackEditpdfRot(payload);
    revalidateAssignFeedbackEditpdfRots();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackEditpdfRotAction = async (input: UpdateAssignFeedbackEditpdfRotParams) => {
  try {
    const payload = updateAssignFeedbackEditpdfRotParams.parse(input);
    await updateAssignFeedbackEditpdfRot(payload.id, payload);
    revalidateAssignFeedbackEditpdfRots();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackEditpdfRotAction = async (input: AssignFeedbackEditpdfRotId) => {
  try {
    const payload = assignFeedbackEditpdfRotIdSchema.parse({ id: input });
    await deleteAssignFeedbackEditpdfRot(payload.id);
    revalidateAssignFeedbackEditpdfRots();
  } catch (e) {
    return handleErrors(e);
  }
};
