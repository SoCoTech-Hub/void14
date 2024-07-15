"use server";

import { revalidatePath } from "next/cache";
import {
  createFeedbackValuetmp,
  deleteFeedbackValuetmp,
  updateFeedbackValuetmp,
} from "@/lib/api/feedbackValuetmps/mutations";
import {
  FeedbackValuetmpId,
  NewFeedbackValuetmpParams,
  UpdateFeedbackValuetmpParams,
  feedbackValuetmpIdSchema,
  insertFeedbackValuetmpParams,
  updateFeedbackValuetmpParams,
} from "@/lib/db/schema/feedbackValuetmps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackValuetmps = () => revalidatePath("/feedback-valuetmps");

export const createFeedbackValuetmpAction = async (input: NewFeedbackValuetmpParams) => {
  try {
    const payload = insertFeedbackValuetmpParams.parse(input);
    await createFeedbackValuetmp(payload);
    revalidateFeedbackValuetmps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackValuetmpAction = async (input: UpdateFeedbackValuetmpParams) => {
  try {
    const payload = updateFeedbackValuetmpParams.parse(input);
    await updateFeedbackValuetmp(payload.id, payload);
    revalidateFeedbackValuetmps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackValuetmpAction = async (input: FeedbackValuetmpId) => {
  try {
    const payload = feedbackValuetmpIdSchema.parse({ id: input });
    await deleteFeedbackValuetmp(payload.id);
    revalidateFeedbackValuetmps();
  } catch (e) {
    return handleErrors(e);
  }
};
