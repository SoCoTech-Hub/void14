import type {
  FeedbackValueId,
  NewFeedbackValueParams,
  UpdateFeedbackValueParams,
} from "@soco/feedback-db/schema/feedbackValues";
import { eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackValueIdSchema,
  feedbackValues,
  insertFeedbackValueSchema,
  updateFeedbackValueSchema,
} from "@soco/feedback-db/schema/feedbackValues";

export const createFeedbackValue = async (
  feedbackValue: NewFeedbackValueParams,
) => {
  const newFeedbackValue = insertFeedbackValueSchema.parse(feedbackValue);
  try {
    const [f] = await db
      .insert(feedbackValues)
      .values(newFeedbackValue)
      .returning();
    return { feedbackValue: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackValue = async (
  id: FeedbackValueId,
  feedbackValue: UpdateFeedbackValueParams,
) => {
  const { id: feedbackValueId } = feedbackValueIdSchema.parse({ id });
  const newFeedbackValue = updateFeedbackValueSchema.parse(feedbackValue);
  try {
    const [f] = await db
      .update(feedbackValues)
      .set(newFeedbackValue)
      .where(eq(feedbackValues.id, feedbackValueId!))
      .returning();
    return { feedbackValue: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackValue = async (id: FeedbackValueId) => {
  const { id: feedbackValueId } = feedbackValueIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(feedbackValues)
      .where(eq(feedbackValues.id, feedbackValueId!))
      .returning();
    return { feedbackValue: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
