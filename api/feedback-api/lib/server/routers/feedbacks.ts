import { getFeedbackById, getFeedbacks } from "@/lib/api/feedbacks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackIdSchema,
  insertFeedbackParams,
  updateFeedbackParams,
} from "@/lib/db/schema/feedbacks";
import { createFeedback, deleteFeedback, updateFeedback } from "@/lib/api/feedbacks/mutations";

export const feedbacksRouter = router({
  getFeedbacks: publicProcedure.query(async () => {
    return getFeedbacks();
  }),
  getFeedbackById: publicProcedure.input(feedbackIdSchema).query(async ({ input }) => {
    return getFeedbackById(input.id);
  }),
  createFeedback: publicProcedure
    .input(insertFeedbackParams)
    .mutation(async ({ input }) => {
      return createFeedback(input);
    }),
  updateFeedback: publicProcedure
    .input(updateFeedbackParams)
    .mutation(async ({ input }) => {
      return updateFeedback(input.id, input);
    }),
  deleteFeedback: publicProcedure
    .input(feedbackIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeedback(input.id);
    }),
});
