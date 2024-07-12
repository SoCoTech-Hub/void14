import {
  feedbackCompletedtmpIdSchema,
  insertFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpParams,
} from "@soco/feedback-db/schema/feedbackCompletedtmps";

import {
  createFeedbackCompletedtmp,
  deleteFeedbackCompletedtmp,
  updateFeedbackCompletedtmp,
} from "../api/feedbackCompletedtmps/mutations";
import {
  getFeedbackCompletedtmpById,
  getFeedbackCompletedtmps,
} from "../api/feedbackCompletedtmps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedbackCompletedtmpsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFeedbackCompletedtmps: publicProcedure.query(async () => {
      return getFeedbackCompletedtmps();
    }),
    getFeedbackCompletedtmpById: publicProcedure
      .input(feedbackCompletedtmpIdSchema)
      .query(async ({ input }) => {
        return getFeedbackCompletedtmpById(input.id);
      }),
    createFeedbackCompletedtmp: publicProcedure
      .input(insertFeedbackCompletedtmpParams)
      .mutation(async ({ input }) => {
        return createFeedbackCompletedtmp(input);
      }),
    updateFeedbackCompletedtmp: publicProcedure
      .input(updateFeedbackCompletedtmpParams)
      .mutation(async ({ input }) => {
        return updateFeedbackCompletedtmp(input.id, input);
      }),
    deleteFeedbackCompletedtmp: publicProcedure
      .input(feedbackCompletedtmpIdSchema)
      .mutation(async ({ input }) => {
        return deleteFeedbackCompletedtmp(input.id);
      }),
  });
