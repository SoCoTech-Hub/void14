"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignFeedbackComment,
  deleteAssignFeedbackComment,
  updateAssignFeedbackComment,
} from "@/lib/api/assignFeedbackComments/mutations";
import {
  AssignFeedbackCommentId,
  NewAssignFeedbackCommentParams,
  UpdateAssignFeedbackCommentParams,
  assignFeedbackCommentIdSchema,
  insertAssignFeedbackCommentParams,
  updateAssignFeedbackCommentParams,
} from "@/lib/db/schema/assignFeedbackComments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackComments = () => revalidatePath("/assign-feedback-comments");

export const createAssignFeedbackCommentAction = async (input: NewAssignFeedbackCommentParams) => {
  try {
    const payload = insertAssignFeedbackCommentParams.parse(input);
    await createAssignFeedbackComment(payload);
    revalidateAssignFeedbackComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackCommentAction = async (input: UpdateAssignFeedbackCommentParams) => {
  try {
    const payload = updateAssignFeedbackCommentParams.parse(input);
    await updateAssignFeedbackComment(payload.id, payload);
    revalidateAssignFeedbackComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackCommentAction = async (input: AssignFeedbackCommentId) => {
  try {
    const payload = assignFeedbackCommentIdSchema.parse({ id: input });
    await deleteAssignFeedbackComment(payload.id);
    revalidateAssignFeedbackComments();
  } catch (e) {
    return handleErrors(e);
  }
};
