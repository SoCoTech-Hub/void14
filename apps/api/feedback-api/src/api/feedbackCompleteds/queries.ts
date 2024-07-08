import { db } from "@soco/feedback-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type FeedbackCompletedId, feedbackCompletedIdSchema, feedbackCompleteds } from "@soco/feedback-db/schema/feedbackCompleteds";

export const getFeedbackCompleteds = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(feedbackCompleteds).where(eq(feedbackCompleteds.userId, session?.user.id!));
  const f = rows
  return { feedbackCompleteds: f };
};

export const getFeedbackCompletedById = async (id: FeedbackCompletedId) => {
  const { session } = await getUserAuth();
  const { id: feedbackCompletedId } = feedbackCompletedIdSchema.parse({ id });
  const [row] = await db.select().from(feedbackCompleteds).where(and(eq(feedbackCompleteds.id, feedbackCompletedId), eq(feedbackCompleteds.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { feedbackCompleted: f };
};


