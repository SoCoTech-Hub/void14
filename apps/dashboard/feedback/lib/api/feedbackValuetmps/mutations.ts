import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  FeedbackValuetmpId, 
  NewFeedbackValuetmpParams,
  UpdateFeedbackValuetmpParams, 
  updateFeedbackValuetmpSchema,
  insertFeedbackValuetmpSchema, 
  feedbackValuetmps,
  feedbackValuetmpIdSchema 
} from "@/lib/db/schema/feedbackValuetmps";

export const createFeedbackValuetmp = async (feedbackValuetmp: NewFeedbackValuetmpParams) => {
  const newFeedbackValuetmp = insertFeedbackValuetmpSchema.parse(feedbackValuetmp);
  try {
    const [f] =  await db.insert(feedbackValuetmps).values(newFeedbackValuetmp).returning();
    return { feedbackValuetmp: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackValuetmp = async (id: FeedbackValuetmpId, feedbackValuetmp: UpdateFeedbackValuetmpParams) => {
  const { id: feedbackValuetmpId } = feedbackValuetmpIdSchema.parse({ id });
  const newFeedbackValuetmp = updateFeedbackValuetmpSchema.parse(feedbackValuetmp);
  try {
    const [f] =  await db
     .update(feedbackValuetmps)
     .set(newFeedbackValuetmp)
     .where(eq(feedbackValuetmps.id, feedbackValuetmpId!))
     .returning();
    return { feedbackValuetmp: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackValuetmp = async (id: FeedbackValuetmpId) => {
  const { id: feedbackValuetmpId } = feedbackValuetmpIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(feedbackValuetmps).where(eq(feedbackValuetmps.id, feedbackValuetmpId!))
    .returning();
    return { feedbackValuetmp: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

