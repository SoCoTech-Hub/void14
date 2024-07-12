import type { FeedbackValuetmpId } from "@soco/feedback-db/schema/feedbackValuetmps";
import { eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackValuetmpIdSchema,
  feedbackValuetmps,
} from "@soco/feedback-db/schema/feedbackValuetmps";

export const getFeedbackValuetmps = async () => {
  const rows = await db.select().from(feedbackValuetmps);
  const f = rows;
  return { feedbackValuetmps: f };
};

export const getFeedbackValuetmpById = async (id: FeedbackValuetmpId) => {
  const { id: feedbackValuetmpId } = feedbackValuetmpIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(feedbackValuetmps)
    .where(eq(feedbackValuetmps.id, feedbackValuetmpId));
  if (row === undefined) return {};
  const f = row;
  return { feedbackValuetmp: f };
};
