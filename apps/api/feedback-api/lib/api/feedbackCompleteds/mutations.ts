import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  FeedbackCompletedId, 
  NewFeedbackCompletedParams,
  UpdateFeedbackCompletedParams, 
  updateFeedbackCompletedSchema,
  insertFeedbackCompletedSchema, 
  feedbackCompleteds,
  feedbackCompletedIdSchema 
} from "@/lib/db/schema/feedbackCompleteds";
import { getUserAuth } from "@soco/auth/utils";

export const createFeedbackCompleted = async (feedbackCompleted: NewFeedbackCompletedParams) => {
  const { session } = await getUserAuth();
  const newFeedbackCompleted = insertFeedbackCompletedSchema.parse({ ...feedbackCompleted, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(feedbackCompleteds).values(newFeedbackCompleted).returning();
    return { feedbackCompleted: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackCompleted = async (id: FeedbackCompletedId, feedbackCompleted: UpdateFeedbackCompletedParams) => {
  const { session } = await getUserAuth();
  const { id: feedbackCompletedId } = feedbackCompletedIdSchema.parse({ id });
  const newFeedbackCompleted = updateFeedbackCompletedSchema.parse({ ...feedbackCompleted, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(feedbackCompleteds)
     .set({...newFeedbackCompleted, updatedAt: new Date() })
     .where(and(eq(feedbackCompleteds.id, feedbackCompletedId!), eq(feedbackCompleteds.userId, session?.user.id!)))
     .returning();
    return { feedbackCompleted: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackCompleted = async (id: FeedbackCompletedId) => {
  const { session } = await getUserAuth();
  const { id: feedbackCompletedId } = feedbackCompletedIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(feedbackCompleteds).where(and(eq(feedbackCompleteds.id, feedbackCompletedId!), eq(feedbackCompleteds.userId, session?.user.id!)))
    .returning();
    return { feedbackCompleted: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

