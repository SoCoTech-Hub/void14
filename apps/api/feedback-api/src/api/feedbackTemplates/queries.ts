import type { FeedbackTemplateId } from "@soco/feedback-db/schema/feedbackTemplates";
import { eq } from "@soco/feedback-db";
import { db } from "@soco/feedback-db/client";
import {
  feedbackTemplateIdSchema,
  feedbackTemplates,
} from "@soco/feedback-db/schema/feedbackTemplates";

export const getFeedbackTemplates = async () => {
  const rows = await db.select().from(feedbackTemplates);
  const f = rows;
  return { feedbackTemplates: f };
};

export const getFeedbackTemplateById = async (id: FeedbackTemplateId) => {
  const { id: feedbackTemplateId } = feedbackTemplateIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(feedbackTemplates)
    .where(eq(feedbackTemplates.id, feedbackTemplateId));
  if (row === undefined) return {};
  const f = row;
  return { feedbackTemplate: f };
};
