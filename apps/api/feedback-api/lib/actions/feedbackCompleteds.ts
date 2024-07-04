"use server";

import { revalidatePath } from "next/cache";

import {
  createFeedbackCompleted,
  deleteFeedbackCompleted,
  updateFeedbackCompleted,
} from "../api/feedbackCompleteds/mutations";
import {
  FeedbackCompletedId,
  feedbackCompletedIdSchema,
  insertFeedbackCompletedParams,
  NewFeedbackCompletedParams,
  UpdateFeedbackCompletedParams,
  updateFeedbackCompletedParams,
} from "../db/schema/feedbackCompleteds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackCompleteds = () =>
  revalidatePath("/feedback-completeds");

export const createFeedbackCompletedAction = async (
  input: NewFeedbackCompletedParams,
) => {
  try {
    const payload = insertFeedbackCompletedParams.parse(input);
    await createFeedbackCompleted(payload);
    revalidateFeedbackCompleteds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackCompletedAction = async (
  input: UpdateFeedbackCompletedParams,
) => {
  try {
    const payload = updateFeedbackCompletedParams.parse(input);
    await updateFeedbackCompleted(payload.id, payload);
    revalidateFeedbackCompleteds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackCompletedAction = async (
  input: FeedbackCompletedId,
) => {
  try {
    const payload = feedbackCompletedIdSchema.parse({ id: input });
    await deleteFeedbackCompleted(payload.id);
    revalidateFeedbackCompleteds();
  } catch (e) {
    return handleErrors(e);
  }
};
