"use server";

import { revalidatePath } from "next/cache";
import {
  createFeedbackItem,
  deleteFeedbackItem,
  updateFeedbackItem,
} from "@/lib/api/feedbackItems/mutations";
import {
  FeedbackItemId,
  NewFeedbackItemParams,
  UpdateFeedbackItemParams,
  feedbackItemIdSchema,
  insertFeedbackItemParams,
  updateFeedbackItemParams,
} from "@/lib/db/schema/feedbackItems";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackItems = () => revalidatePath("/feedback-items");

export const createFeedbackItemAction = async (input: NewFeedbackItemParams) => {
  try {
    const payload = insertFeedbackItemParams.parse(input);
    await createFeedbackItem(payload);
    revalidateFeedbackItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackItemAction = async (input: UpdateFeedbackItemParams) => {
  try {
    const payload = updateFeedbackItemParams.parse(input);
    await updateFeedbackItem(payload.id, payload);
    revalidateFeedbackItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackItemAction = async (input: FeedbackItemId) => {
  try {
    const payload = feedbackItemIdSchema.parse({ id: input });
    await deleteFeedbackItem(payload.id);
    revalidateFeedbackItems();
  } catch (e) {
    return handleErrors(e);
  }
};
