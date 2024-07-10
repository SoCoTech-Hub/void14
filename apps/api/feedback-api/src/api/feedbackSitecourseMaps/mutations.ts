import { db } from "@soco/feedback-db/client";
import { eq } from "@soco/feedback-db";
import { 
  FeedbackSitecourseMapId, 
  NewFeedbackSitecourseMapParams,
  UpdateFeedbackSitecourseMapParams, 
  updateFeedbackSitecourseMapSchema,
  insertFeedbackSitecourseMapSchema, 
  feedbackSitecourseMaps,
  feedbackSitecourseMapIdSchema 
} from "@soco/feedback-db/schema/feedbackSitecourseMaps";

export const createFeedbackSitecourseMap = async (feedbackSitecourseMap: NewFeedbackSitecourseMapParams) => {
  const newFeedbackSitecourseMap = insertFeedbackSitecourseMapSchema.parse(feedbackSitecourseMap);
  try {
    const [f] =  await db.insert(feedbackSitecourseMaps).values(newFeedbackSitecourseMap).returning();
    return { feedbackSitecourseMap: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackSitecourseMap = async (id: FeedbackSitecourseMapId, feedbackSitecourseMap: UpdateFeedbackSitecourseMapParams) => {
  const { id: feedbackSitecourseMapId } = feedbackSitecourseMapIdSchema.parse({ id });
  const newFeedbackSitecourseMap = updateFeedbackSitecourseMapSchema.parse(feedbackSitecourseMap);
  try {
    const [f] =  await db
     .update(feedbackSitecourseMaps)
     .set(newFeedbackSitecourseMap)
     .where(eq(feedbackSitecourseMaps.id, feedbackSitecourseMapId!))
     .returning();
    return { feedbackSitecourseMap: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackSitecourseMap = async (id: FeedbackSitecourseMapId) => {
  const { id: feedbackSitecourseMapId } = feedbackSitecourseMapIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(feedbackSitecourseMaps).where(eq(feedbackSitecourseMaps.id, feedbackSitecourseMapId!))
    .returning();
    return { feedbackSitecourseMap: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

