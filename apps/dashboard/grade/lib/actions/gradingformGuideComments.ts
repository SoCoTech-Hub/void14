"use server";

import { revalidatePath } from "next/cache";
import {
  createGradingformGuideComment,
  deleteGradingformGuideComment,
  updateGradingformGuideComment,
} from "@/lib/api/gradingformGuideComments/mutations";
import {
  GradingformGuideCommentId,
  NewGradingformGuideCommentParams,
  UpdateGradingformGuideCommentParams,
  gradingformGuideCommentIdSchema,
  insertGradingformGuideCommentParams,
  updateGradingformGuideCommentParams,
} from "@/lib/db/schema/gradingformGuideComments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingformGuideComments = () => revalidatePath("/gradingform-guide-comments");

export const createGradingformGuideCommentAction = async (input: NewGradingformGuideCommentParams) => {
  try {
    const payload = insertGradingformGuideCommentParams.parse(input);
    await createGradingformGuideComment(payload);
    revalidateGradingformGuideComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingformGuideCommentAction = async (input: UpdateGradingformGuideCommentParams) => {
  try {
    const payload = updateGradingformGuideCommentParams.parse(input);
    await updateGradingformGuideComment(payload.id, payload);
    revalidateGradingformGuideComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingformGuideCommentAction = async (input: GradingformGuideCommentId) => {
  try {
    const payload = gradingformGuideCommentIdSchema.parse({ id: input });
    await deleteGradingformGuideComment(payload.id);
    revalidateGradingformGuideComments();
  } catch (e) {
    return handleErrors(e);
  }
};
