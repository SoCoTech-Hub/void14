import { getFeedbackCompletedById, getFeedbackCompleteds } from "../api/feedbackCompleteds/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  feedbackCompletedIdSchema,
  insertFeedbackCompletedParams,
  updateFeedbackCompletedParams,
} from "@soco/feedback-db/schema/feedbackCompleteds";
import { createFeedbackCompleted, deleteFeedbackCompleted, updateFeedbackCompleted } from "../api/feedbackCompleteds/mutations";

export const feedbackCompletedsRouter =createTRPCRouter({
  getFeedbackCompleteds: publicProcedure.query(async () => {
    return getFeedbackCompleteds();
  }),
  getFeedbackCompletedById: publicProcedure.input(feedbackCompletedIdSchema).query(async ({ input }) => {
    return getFeedbackCompletedById(input.id);
  }),
  createFeedbackCompleted: publicProcedure
    .input(insertFeedbackCompletedParams)
    .mutation(async ({ input }) => {
      return createFeedbackCompleted(input);
    }),
  updateFeedbackCompleted: publicProcedure
    .input(updateFeedbackCompletedParams)
    .mutation(async ({ input }) => {
      return updateFeedbackCompleted(input.id, input);
    }),
  deleteFeedbackCompleted: publicProcedure
    .input(feedbackCompletedIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeedbackCompleted(input.id);
    }),
});
