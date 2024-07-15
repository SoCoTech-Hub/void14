"use server";

import { revalidatePath } from "next/cache";
import {
  createFeedbackCompletedtmp,
  deleteFeedbackCompletedtmp,
  updateFeedbackCompletedtmp,
} from "@/lib/api/feedbackCompletedtmps/mutations";
import {
  FeedbackCompletedtmpId,
  NewFeedbackCompletedtmpParams,
  UpdateFeedbackCompletedtmpParams,
  feedbackCompletedtmpIdSchema,
  insertFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpParams,
} from "@/lib/db/schema/feedbackCompletedtmps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackCompletedtmps = () => revalidatePath("/feedback-completedtmps");

export const createFeedbackCompletedtmpAction = async (input: NewFeedbackCompletedtmpParams) => {
  try {
    const payload = insertFeedbackCompletedtmpParams.parse(input);
    await createFeedbackCompletedtmp(payload);
    revalidateFeedbackCompletedtmps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackCompletedtmpAction = async (input: UpdateFeedbackCompletedtmpParams) => {
  try {
    const payload = updateFeedbackCompletedtmpParams.parse(input);
    await updateFeedbackCompletedtmp(payload.id, payload);
    revalidateFeedbackCompletedtmps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackCompletedtmpAction = async (input: FeedbackCompletedtmpId) => {
  try {
    const payload = feedbackCompletedtmpIdSchema.parse({ id: input });
    await deleteFeedbackCompletedtmp(payload.id);
    revalidateFeedbackCompletedtmps();
  } catch (e) {
    return handleErrors(e);
  }
};
