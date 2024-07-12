import type {
  FeedbackCompletedtmpId,
  NewFeedbackCompletedtmpParams,
  UpdateFeedbackCompletedtmpParams,
} from "@soco/feedback-db/schema/feedbackCompletedtmps";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackCompletedtmpIdSchema,
  feedbackCompletedtmps,
  insertFeedbackCompletedtmpSchema,
  updateFeedbackCompletedtmpSchema,
} from "@soco/feedback-db/schema/feedbackCompletedtmps";

export const createFeedbackCompletedtmp = async (
  feedbackCompletedtmp: NewFeedbackCompletedtmpParams,
) => {
  const { session } = await getUserAuth();
  const newFeedbackCompletedtmp = insertFeedbackCompletedtmpSchema.parse({
    ...feedbackCompletedtmp,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .insert(feedbackCompletedtmps)
      .values(newFeedbackCompletedtmp)
      .returning();
    return { feedbackCompletedtmp: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackCompletedtmp = async (
  id: FeedbackCompletedtmpId,
  feedbackCompletedtmp: UpdateFeedbackCompletedtmpParams,
) => {
  const { session } = await getUserAuth();
  const { id: feedbackCompletedtmpId } = feedbackCompletedtmpIdSchema.parse({
    id,
  });
  const newFeedbackCompletedtmp = updateFeedbackCompletedtmpSchema.parse({
    ...feedbackCompletedtmp,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .update(feedbackCompletedtmps)
      .set({ ...newFeedbackCompletedtmp, updatedAt: new Date() })
      .where(
        and(
          eq(feedbackCompletedtmps.id, feedbackCompletedtmpId!),
          eq(feedbackCompletedtmps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { feedbackCompletedtmp: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackCompletedtmp = async (
  id: FeedbackCompletedtmpId,
) => {
  const { session } = await getUserAuth();
  const { id: feedbackCompletedtmpId } = feedbackCompletedtmpIdSchema.parse({
    id,
  });
  try {
    const [f] = await db
      .delete(feedbackCompletedtmps)
      .where(
        and(
          eq(feedbackCompletedtmps.id, feedbackCompletedtmpId!),
          eq(feedbackCompletedtmps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { feedbackCompletedtmp: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
