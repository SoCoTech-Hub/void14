import type { FeedbackValueId } from "@soco/feedback-db/schema/feedbackValues";
import { eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackValueIdSchema,
  feedbackValues,
} from "@soco/feedback-db/schema/feedbackValues";

export const getFeedbackValues = async () => {
  const rows = await db.select().from(feedbackValues);
  const f = rows;
  return { feedbackValues: f };
};

export const getFeedbackValueById = async (id: FeedbackValueId) => {
  const { id: feedbackValueId } = feedbackValueIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(feedbackValues)
    .where(eq(feedbackValues.id, feedbackValueId));
  if (row === undefined) return {};
  const f = row;
  return { feedbackValue: f };
};
