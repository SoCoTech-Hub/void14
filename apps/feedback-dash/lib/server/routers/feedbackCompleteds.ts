import { getFeedbackCompletedById, getFeedbackCompleteds } from "@/lib/api/feedbackCompleteds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackCompletedIdSchema,
  insertFeedbackCompletedParams,
  updateFeedbackCompletedParams,
} from "@/lib/db/schema/feedbackCompleteds";
import { createFeedbackCompleted, deleteFeedbackCompleted, updateFeedbackCompleted } from "@/lib/api/feedbackCompleteds/mutations";

export const feedbackCompletedsRouter = router({
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
