import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  FeedbackCompletedtmpId,
  feedbackCompletedtmpIdSchema,
  feedbackCompletedtmps,
  insertFeedbackCompletedtmpSchema,
  NewFeedbackCompletedtmpParams,
  UpdateFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpSchema,
} from "../../db/schema/feedbackCompletedtmps";

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
