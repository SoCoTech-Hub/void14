import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type FeedbackSitecourseMapId, feedbackSitecourseMapIdSchema, feedbackSitecourseMaps } from "@/lib/db/schema/feedbackSitecourseMaps";
import { feedbacks } from "@/lib/db/schema/feedbacks";

export const getFeedbackSitecourseMaps = async () => {
  const rows = await db.select({ feedbackSitecourseMap: feedbackSitecourseMaps, feedback: feedbacks }).from(feedbackSitecourseMaps).leftJoin(feedbacks, eq(feedbackSitecourseMaps.feedbackId, feedbacks.id));
  const f = rows .map((r) => ({ ...r.feedbackSitecourseMap, feedback: r.feedback})); 
  return { feedbackSitecourseMaps: f };
};

export const getFeedbackSitecourseMapById = async (id: FeedbackSitecourseMapId) => {
  const { id: feedbackSitecourseMapId } = feedbackSitecourseMapIdSchema.parse({ id });
  const [row] = await db.select({ feedbackSitecourseMap: feedbackSitecourseMaps, feedback: feedbacks }).from(feedbackSitecourseMaps).where(eq(feedbackSitecourseMaps.id, feedbackSitecourseMapId)).leftJoin(feedbacks, eq(feedbackSitecourseMaps.feedbackId, feedbacks.id));
  if (row === undefined) return {};
  const f =  { ...row.feedbackSitecourseMap, feedback: row.feedback } ;
  return { feedbackSitecourseMap: f };
};


