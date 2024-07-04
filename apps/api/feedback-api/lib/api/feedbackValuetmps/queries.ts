import { eq } from "drizzle-orm";

import type { FeedbackValuetmpId } from "../db/schema/feedbackValuetmps";
import { db } from "../db/index";
import {
  feedbackValuetmpIdSchema,
  feedbackValuetmps,
} from "../db/schema/feedbackValuetmps";

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
