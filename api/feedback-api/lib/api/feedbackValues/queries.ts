import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type FeedbackValueId, feedbackValueIdSchema, feedbackValues } from "@/lib/db/schema/feedbackValues";

export const getFeedbackValues = async () => {
  const rows = await db.select().from(feedbackValues);
  const f = rows
  return { feedbackValues: f };
};

export const getFeedbackValueById = async (id: FeedbackValueId) => {
  const { id: feedbackValueId } = feedbackValueIdSchema.parse({ id });
  const [row] = await db.select().from(feedbackValues).where(eq(feedbackValues.id, feedbackValueId));
  if (row === undefined) return {};
  const f = row;
  return { feedbackValue: f };
};


