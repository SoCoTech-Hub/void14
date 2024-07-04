"use server";

import { revalidatePath } from "next/cache";

import {
  createAssignFeedbackEditpdfQueue,
  deleteAssignFeedbackEditpdfQueue,
  updateAssignFeedbackEditpdfQueue,
} from "../api/assignFeedbackEditpdfQueues/mutations";
import {
  AssignFeedbackEditpdfQueueId,
  assignFeedbackEditpdfQueueIdSchema,
  insertAssignFeedbackEditpdfQueueParams,
  NewAssignFeedbackEditpdfQueueParams,
  UpdateAssignFeedbackEditpdfQueueParams,
  updateAssignFeedbackEditpdfQueueParams,
} from "../db/schema/assignFeedbackEditpdfQueues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignFeedbackEditpdfQueues = () =>
  revalidatePath("/assign-feedback-editpdf-queues");

export const createAssignFeedbackEditpdfQueueAction = async (
  input: NewAssignFeedbackEditpdfQueueParams,
) => {
  try {
    const payload = insertAssignFeedbackEditpdfQueueParams.parse(input);
    await createAssignFeedbackEditpdfQueue(payload);
    revalidateAssignFeedbackEditpdfQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignFeedbackEditpdfQueueAction = async (
  input: UpdateAssignFeedbackEditpdfQueueParams,
) => {
  try {
    const payload = updateAssignFeedbackEditpdfQueueParams.parse(input);
    await updateAssignFeedbackEditpdfQueue(payload.id, payload);
    revalidateAssignFeedbackEditpdfQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignFeedbackEditpdfQueueAction = async (
  input: AssignFeedbackEditpdfQueueId,
) => {
  try {
    const payload = assignFeedbackEditpdfQueueIdSchema.parse({ id: input });
    await deleteAssignFeedbackEditpdfQueue(payload.id);
    revalidateAssignFeedbackEditpdfQueues();
  } catch (e) {
    return handleErrors(e);
  }
};
