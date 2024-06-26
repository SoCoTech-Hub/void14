import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type FeedbackCompletedtmpId, feedbackCompletedtmpIdSchema, feedbackCompletedtmps } from "@/lib/db/schema/feedbackCompletedtmps";

export const getFeedbackCompletedtmps = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(feedbackCompletedtmps).where(eq(feedbackCompletedtmps.userId, session?.user.id!));
  const f = rows
  return { feedbackCompletedtmps: f };
};

export const getFeedbackCompletedtmpById = async (id: FeedbackCompletedtmpId) => {
  const { session } = await getUserAuth();
  const { id: feedbackCompletedtmpId } = feedbackCompletedtmpIdSchema.parse({ id });
  const [row] = await db.select().from(feedbackCompletedtmps).where(and(eq(feedbackCompletedtmps.id, feedbackCompletedtmpId), eq(feedbackCompletedtmps.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { feedbackCompletedtmp: f };
};


