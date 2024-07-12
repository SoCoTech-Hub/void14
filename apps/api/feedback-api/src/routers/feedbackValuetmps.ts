import {
  feedbackValuetmpIdSchema,
  insertFeedbackValuetmpParams,
  updateFeedbackValuetmpParams,
} from "@soco/feedback-db/schema/feedbackValuetmps";

import {
  createFeedbackValuetmp,
  deleteFeedbackValuetmp,
  updateFeedbackValuetmp,
} from "../api/feedbackValuetmps/mutations";
import {
  getFeedbackValuetmpById,
  getFeedbackValuetmps,
} from "../api/feedbackValuetmps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedbackValuetmpsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getFeedbackValuetmps: publicProcedure.query(async () => {
      return getFeedbackValuetmps();
    }),
    getFeedbackValuetmpById: publicProcedure
      .input(feedbackValuetmpIdSchema)
      .query(async ({ input }) => {
        return getFeedbackValuetmpById(input.id);
      }),
    createFeedbackValuetmp: publicProcedure
      .input(insertFeedbackValuetmpParams)
      .mutation(async ({ input }) => {
        return createFeedbackValuetmp(input);
      }),
    updateFeedbackValuetmp: publicProcedure
      .input(updateFeedbackValuetmpParams)
      .mutation(async ({ input }) => {
        return updateFeedbackValuetmp(input.id, input);
      }),
    deleteFeedbackValuetmp: publicProcedure
      .input(feedbackValuetmpIdSchema)
      .mutation(async ({ input }) => {
        return deleteFeedbackValuetmp(input.id);
      }),
  });
