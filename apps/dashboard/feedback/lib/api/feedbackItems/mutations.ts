import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type FeedbackItemId, 
  type NewFeedbackItemParams,
  type UpdateFeedbackItemParams, 
  updateFeedbackItemSchema,
  insertFeedbackItemSchema, 
  feedbackItems,
  feedbackItemIdSchema 
} from "@/lib/db/schema/feedbackItems";

export const createFeedbackItem = async (feedbackItem: NewFeedbackItemParams) => {
  const newFeedbackItem = insertFeedbackItemSchema.parse(feedbackItem);
  try {
    const [f] =  await db.insert(feedbackItems).values(newFeedbackItem).returning();
    return { feedbackItem: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackItem = async (id: FeedbackItemId, feedbackItem: UpdateFeedbackItemParams) => {
  const { id: feedbackItemId } = feedbackItemIdSchema.parse({ id });
  const newFeedbackItem = updateFeedbackItemSchema.parse(feedbackItem);
  try {
    const [f] =  await db
     .update(feedbackItems)
     .set(newFeedbackItem)
     .where(eq(feedbackItems.id, feedbackItemId!))
     .returning();
    return { feedbackItem: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackItem = async (id: FeedbackItemId) => {
  const { id: feedbackItemId } = feedbackItemIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(feedbackItems).where(eq(feedbackItems.id, feedbackItemId!))
    .returning();
    return { feedbackItem: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

