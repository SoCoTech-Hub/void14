import type { FeedbackId } from "@soco/feedback-db/schema/feedbacks";
import { eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackIdSchema,
  feedbacks,
} from "@soco/feedback-db/schema/feedbacks";

export const getFeedbacks = async () => {
  const rows = await db.select().from(feedbacks);
  const f = rows;
  return { feedbacks: f };
};

export const getFeedbackById = async (id: FeedbackId) => {
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(feedbacks)
    .where(eq(feedbacks.id, feedbackId));
  if (row === undefined) return {};
  const f = row;
  return { feedback: f };
};
