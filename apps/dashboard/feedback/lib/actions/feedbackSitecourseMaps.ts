"use server";

import { revalidatePath } from "next/cache";
import {
  createFeedbackSitecourseMap,
  deleteFeedbackSitecourseMap,
  updateFeedbackSitecourseMap,
} from "@/lib/api/feedbackSitecourseMaps/mutations";
import {
  FeedbackSitecourseMapId,
  NewFeedbackSitecourseMapParams,
  UpdateFeedbackSitecourseMapParams,
  feedbackSitecourseMapIdSchema,
  insertFeedbackSitecourseMapParams,
  updateFeedbackSitecourseMapParams,
} from "@/lib/db/schema/feedbackSitecourseMaps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbackSitecourseMaps = () => revalidatePath("/feedback-sitecourse-maps");

export const createFeedbackSitecourseMapAction = async (input: NewFeedbackSitecourseMapParams) => {
  try {
    const payload = insertFeedbackSitecourseMapParams.parse(input);
    await createFeedbackSitecourseMap(payload);
    revalidateFeedbackSitecourseMaps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackSitecourseMapAction = async (input: UpdateFeedbackSitecourseMapParams) => {
  try {
    const payload = updateFeedbackSitecourseMapParams.parse(input);
    await updateFeedbackSitecourseMap(payload.id, payload);
    revalidateFeedbackSitecourseMaps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackSitecourseMapAction = async (input: FeedbackSitecourseMapId) => {
  try {
    const payload = feedbackSitecourseMapIdSchema.parse({ id: input });
    await deleteFeedbackSitecourseMap(payload.id);
    revalidateFeedbackSitecourseMaps();
  } catch (e) {
    return handleErrors(e);
  }
};
