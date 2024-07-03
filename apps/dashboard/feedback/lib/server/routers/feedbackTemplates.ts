import { getFeedbackTemplateById, getFeedbackTemplates } from "@/lib/api/feedbackTemplates/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackTemplateIdSchema,
  insertFeedbackTemplateParams,
  updateFeedbackTemplateParams,
} from "@/lib/db/schema/feedbackTemplates";
import { createFeedbackTemplate, deleteFeedbackTemplate, updateFeedbackTemplate } from "@/lib/api/feedbackTemplates/mutations";

export const feedbackTemplatesRouter = router({
  getFeedbackTemplates: publicProcedure.query(async () => {
    return getFeedbackTemplates();
  }),
  getFeedbackTemplateById: publicProcedure.input(feedbackTemplateIdSchema).query(async ({ input }) => {
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
