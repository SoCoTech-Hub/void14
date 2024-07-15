"use server";

import { revalidatePath } from "next/cache";
import {
  createSupportComment,
  deleteSupportComment,
  updateSupportComment,
} from "@/lib/api/supportComments/mutations";
import {
  SupportCommentId,
  NewSupportCommentParams,
  UpdateSupportCommentParams,
  supportCommentIdSchema,
  insertSupportCommentParams,
  updateSupportCommentParams,
} from "@/lib/db/schema/supportComments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSupportComments = () => revalidatePath("/support-comments");

export const createSupportCommentAction = async (input: NewSupportCommentParams) => {
  try {
    const payload = insertSupportCommentParams.parse(input);
    await createSupportComment(payload);
    revalidateSupportComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSupportCommentAction = async (input: UpdateSupportCommentParams) => {
  try {
    const payload = updateSupportCommentParams.parse(input);
    await updateSupportComment(payload.id, payload);
    revalidateSupportComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSupportCommentAction = async (input: SupportCommentId) => {
  try {
    const payload = supportCommentIdSchema.parse({ id: input });
    await deleteSupportComment(payload.id);
    revalidateSupportComments();
  } catch (e) {
    return handleErrors(e);
  }
};
