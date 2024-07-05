import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  FeedbackValueId,
  feedbackValueIdSchema,
  feedbackValues,
  insertFeedbackValueSchema,
  NewFeedbackValueParams,
  UpdateFeedbackValueParams,
  updateFeedbackValueSchema,
} from "../../db/schema/feedbackValues";

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
