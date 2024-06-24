"use server";

import { revalidatePath } from "next/cache";
import {
  createFeedbackTemplate,
  deleteFeedbackTemplate,
  updateFeedbackTemplate,
} from "@/lib/api/feedbackTemplates/mutations";
import {
  FeedbackTemplateId,
  NewFeedbackTemplateParams,
  UpdateFeedbackTemplateParams,
  feedbackTemplateIdSchema,
  insertFeedbackTemplateParams,
  updateFeedbackTemplateParams,
} from "@/lib/db/schema/feedbackTemplates";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackTemplates = () => revalidatePath("/feedback-templates");

export const createFeedbackTemplateAction = async (input: NewFeedbackTemplateParams) => {
  try {
    const payload = insertFeedbackTemplateParams.parse(input);
    await createFeedbackTemplate(payload);
    revalidateFeedbackTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackTemplateAction = async (input: UpdateFeedbackTemplateParams) => {
  try {
    const payload = updateFeedbackTemplateParams.parse(input);
    await updateFeedbackTemplate(payload.id, payload);
    revalidateFeedbackTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackTemplateAction = async (input: FeedbackTemplateId) => {
  try {
    const payload = feedbackTemplateIdSchema.parse({ id: input });
    await deleteFeedbackTemplate(payload.id);
    revalidateFeedbackTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};