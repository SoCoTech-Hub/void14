import type {
  FeedbackItemId,
  NewFeedbackItemParams,
  UpdateFeedbackItemParams,
} from "@soco/feedback-db/schema/feedbackItems";
import { eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackItemIdSchema,
  feedbackItems,
  insertFeedbackItemSchema,
  updateFeedbackItemSchema,
} from "@soco/feedback-db/schema/feedbackItems";

export const createFeedbackItem = async (
  feedbackItem: NewFeedbackItemParams,
) => {
  const newFeedbackItem = insertFeedbackItemSchema.parse(feedbackItem);
  try {
    const [f] = await db
      .insert(feedbackItems)
      .values(newFeedbackItem)
      .returning();
    return { feedbackItem: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackItem = async (
  id: FeedbackItemId,
  feedbackItem: UpdateFeedbackItemParams,
) => {
  const { id: feedbackItemId } = feedbackItemIdSchema.parse({ id });
  const newFeedbackItem = updateFeedbackItemSchema.parse(feedbackItem);
  try {
    const [f] = await db
      .update(feedbackItems)
      .set(newFeedbackItem)
      .where(eq(feedbackItems.id, feedbackItemId!))
      .returning();
    return { feedbackItem: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackItem = async (id: FeedbackItemId) => {
  const { id: feedbackItemId } = feedbackItemIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(feedbackItems)
      .where(eq(feedbackItems.id, feedbackItemId!))
      .returning();
    return { feedbackItem: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
