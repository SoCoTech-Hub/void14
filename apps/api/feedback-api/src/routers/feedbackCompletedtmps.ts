import { getFeedbackCompletedtmpById, getFeedbackCompletedtmps } from "../api/feedbackCompletedtmps/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  feedbackCompletedtmpIdSchema,
  insertFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpParams,
} from "@soco/feedback-db/schema/feedbackCompletedtmps";
import { createFeedbackCompletedtmp, deleteFeedbackCompletedtmp, updateFeedbackCompletedtmp } from "../api/feedbackCompletedtmps/mutations";

export const feedbackCompletedtmpsRouter =createTRPCRouter({
  getFeedbackCompletedtmps: publicProcedure.query(async () => {
    return getFeedbackCompletedtmps();
  }),
  getFeedbackCompletedtmpById: publicProcedure.input(feedbackCompletedtmpIdSchema).query(async ({ input }) => {
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
