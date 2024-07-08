import { db } from "@soco/feedback-db/index";
import { eq } from "drizzle-orm";
import { 
  FeedbackId, 
  NewFeedbackParams,
  UpdateFeedbackParams, 
  updateFeedbackSchema,
  insertFeedbackSchema, 
  feedbacks,
  feedbackIdSchema 
} from "@soco/feedback-db/schema/feedbacks";

export const createFeedback = async (feedback: NewFeedbackParams) => {
  const newFeedback = insertFeedbackSchema.parse(feedback);
  try {
    const [f] =  await db.insert(feedbacks).values(newFeedback).returning();
    return { feedback: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedback = async (id: FeedbackId, feedback: UpdateFeedbackParams) => {
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  const newFeedback = updateFeedbackSchema.parse(feedback);
  try {
    const [f] =  await db
     .update(feedbacks)
     .set({...newFeedback, updatedAt: new Date() })
     .where(eq(feedbacks.id, feedbackId!))
     .returning();
    return { feedback: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedback = async (id: FeedbackId) => {
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(feedbacks).where(eq(feedbacks.id, feedbackId!))
    .returning();
    return { feedback: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

