import { eq } from "drizzle-orm";

import type { FeedbackItemId } from "../../db/schema/feedbackItems";
import { db } from "../../db/index";
import {
  feedbackItemIdSchema,
  feedbackItems,
} from "../../db/schema/feedbackItems";

export const getFeedbackItems = async () => {
  const rows = await db.select().from(feedbackItems);
  const f = rows;
  return { feedbackItems: f };
};

export const getFeedbackItemById = async (id: FeedbackItemId) => {
  const { id: feedbackItemId } = feedbackItemIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(feedbackItems)
    .where(eq(feedbackItems.id, feedbackItemId));
  if (row === undefined) return {};
  const f = row;
  return { feedbackItem: f };
};
