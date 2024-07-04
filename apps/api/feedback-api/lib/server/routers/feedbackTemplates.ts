import {
  createFeedbackTemplate,
  deleteFeedbackTemplate,
  updateFeedbackTemplate,
} from "../api/feedbackTemplates/mutations";
import {
  getFeedbackTemplateById,
  getFeedbackTemplates,
} from "../api/feedbackTemplates/queries";
import {
  feedbackTemplateIdSchema,
  insertFeedbackTemplateParams,
  updateFeedbackTemplateParams,
} from "../db/schema/feedbackTemplates";
import { publicProcedure, router } from "../server/trpc";

export const feedbackTemplatesRouter = router({
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
