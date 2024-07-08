import { db } from "@soco/feedback-db/index";
import { eq } from "drizzle-orm";
import { type FeedbackItemId, feedbackItemIdSchema, feedbackItems } from "@soco/feedback-db/schema/feedbackItems";

export const getFeedbackItems = async () => {
  const rows = await db.select().from(feedbackItems);
  const f = rows
  return { feedbackItems: f };
};

export const getFeedbackItemById = async (id: FeedbackItemId) => {
  const { id: feedbackItemId } = feedbackItemIdSchema.parse({ id });
  const [row] = await db.select().from(feedbackItems).where(eq(feedbackItems.id, feedbackItemId));
  if (row === undefined) return {};
  const f = row;
  return { feedbackItem: f };
};


