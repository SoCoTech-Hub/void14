import {
  createFeedbackCompletedtmp,
  deleteFeedbackCompletedtmp,
  updateFeedbackCompletedtmp,
} from "../api/feedbackCompletedtmps/mutations";
import {
  getFeedbackCompletedtmpById,
  getFeedbackCompletedtmps,
} from "../api/feedbackCompletedtmps/queries";
import {
  feedbackCompletedtmpIdSchema,
  insertFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpParams,
} from "../db/schema/feedbackCompletedtmps";
import { publicProcedure, router } from "../server/trpc";

export const feedbackCompletedtmpsRouter = router({
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
