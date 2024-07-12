import {
  feedbackTemplateIdSchema,
  insertFeedbackTemplateParams,
  updateFeedbackTemplateParams,
} from "@soco/feedback-db/schema/feedbackTemplates";

import {
  createFeedbackTemplate,
  deleteFeedbackTemplate,
  updateFeedbackTemplate,
} from "../api/feedbackTemplates/mutations";
import {
  getFeedbackTemplateById,
  getFeedbackTemplates,
} from "../api/feedbackTemplates/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedbackTemplatesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFeedbackTemplates: publicProcedure.query(async () => {
      return getFeedbackTemplates();
    }),
    getFeedbackTemplateById: publicProcedure
      .input(feedbackTemplateIdSchema)
      .query(async ({ input }) => {
        return getFeedbackTemplateById(input.id);
      }),
    createFeedbackTemplate: publicProcedure
      .input(insertFeedbackTemplateParams)
      .mutation(async ({ input }) => {
        return createFeedbackTemplate(input);
      }),
    updateFeedbackTemplate: publicProcedure
      .input(updateFeedbackTemplateParams)
      .mutation(async ({ input }) => {
        return updateFeedbackTemplate(input.id, input);
      }),
    deleteFeedbackTemplate: publicProcedure
      .input(feedbackTemplateIdSchema)
      .mutation(async ({ input }) => {
        return deleteFeedbackTemplate(input.id);
      }),
  });
