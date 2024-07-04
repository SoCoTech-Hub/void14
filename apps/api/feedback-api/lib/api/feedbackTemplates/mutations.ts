import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  FeedbackTemplateId,
  feedbackTemplateIdSchema,
  feedbackTemplates,
  insertFeedbackTemplateSchema,
  NewFeedbackTemplateParams,
  UpdateFeedbackTemplateParams,
  updateFeedbackTemplateSchema,
} from "../db/schema/feedbackTemplates";

export const createFeedbackTemplate = async (
  feedbackTemplate: NewFeedbackTemplateParams,
) => {
  const newFeedbackTemplate =
    insertFeedbackTemplateSchema.parse(feedbackTemplate);
  try {
    const [f] = await db
      .insert(feedbackTemplates)
      .values(newFeedbackTemplate)
      .returning();
    return { feedbackTemplate: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFeedbackTemplate = async (
  id: FeedbackTemplateId,
  feedbackTemplate: UpdateFeedbackTemplateParams,
) => {
  const { id: feedbackTemplateId } = feedbackTemplateIdSchema.parse({ id });
  const newFeedbackTemplate =
    updateFeedbackTemplateSchema.parse(feedbackTemplate);
  try {
    const [f] = await db
      .update(feedbackTemplates)
      .set(newFeedbackTemplate)
      .where(eq(feedbackTemplates.id, feedbackTemplateId!))
      .returning();
    return { feedbackTemplate: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFeedbackTemplate = async (id: FeedbackTemplateId) => {
  const { id: feedbackTemplateId } = feedbackTemplateIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(feedbackTemplates)
      .where(eq(feedbackTemplates.id, feedbackTemplateId!))
      .returning();
    return { feedbackTemplate: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
