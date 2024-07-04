"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopFormComment,
  deleteWorkshopFormComment,
  updateWorkshopFormComment,
} from "../api/workshopFormComments/mutations";
import {
  insertWorkshopFormCommentParams,
  NewWorkshopFormCommentParams,
  UpdateWorkshopFormCommentParams,
  updateWorkshopFormCommentParams,
  WorkshopFormCommentId,
  workshopFormCommentIdSchema,
} from "../db/schema/workshopFormComments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormComments = () =>
  revalidatePath("/workshop-form-comments");

export const createWorkshopFormCommentAction = async (
  input: NewWorkshopFormCommentParams,
) => {
  try {
    const payload = insertWorkshopFormCommentParams.parse(input);
    await createWorkshopFormComment(payload);
    revalidateWorkshopFormComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormCommentAction = async (
  input: UpdateWorkshopFormCommentParams,
) => {
  try {
    const payload = updateWorkshopFormCommentParams.parse(input);
    await updateWorkshopFormComment(payload.id, payload);
    revalidateWorkshopFormComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormCommentAction = async (
  input: WorkshopFormCommentId,
) => {
  try {
    const payload = workshopFormCommentIdSchema.parse({ id: input });
    await deleteWorkshopFormComment(payload.id);
    revalidateWorkshopFormComments();
  } catch (e) {
    return handleErrors(e);
  }
};
