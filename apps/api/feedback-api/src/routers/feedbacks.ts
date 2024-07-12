import {
  feedbackIdSchema,
  insertFeedbackParams,
  updateFeedbackParams,
} from "@soco/feedback-db/schema/feedbacks";

import {
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from "../api/feedbacks/mutations";
import { getFeedbackById, getFeedbacks } from "../api/feedbacks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedbacksRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFeedbacks: publicProcedure.query(async () => {
      return getFeedbacks();
    }),
    getFeedbackById: publicProcedure
      .input(feedbackIdSchema)
      .query(async ({ input }) => {
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
