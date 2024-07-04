"use server";

import { revalidatePath } from "next/cache";

import {
  createFeedbackValue,
  deleteFeedbackValue,
  updateFeedbackValue,
} from "../api/feedbackValues/mutations";
import {
  FeedbackValueId,
  feedbackValueIdSchema,
  insertFeedbackValueParams,
  NewFeedbackValueParams,
  UpdateFeedbackValueParams,
  updateFeedbackValueParams,
} from "../db/schema/feedbackValues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackValues = () => revalidatePath("/feedback-values");

export const createFeedbackValueAction = async (
  input: NewFeedbackValueParams,
) => {
  try {
    const payload = insertFeedbackValueParams.parse(input);
    await createFeedbackValue(payload);
    revalidateFeedbackValues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackValueAction = async (
  input: UpdateFeedbackValueParams,
) => {
  try {
    const payload = updateFeedbackValueParams.parse(input);
    await updateFeedbackValue(payload.id, payload);
    revalidateFeedbackValues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackValueAction = async (input: FeedbackValueId) => {
  try {
    const payload = feedbackValueIdSchema.parse({ id: input });
    await deleteFeedbackValue(payload.id);
    revalidateFeedbackValues();
  } catch (e) {
    return handleErrors(e);
  }
};
