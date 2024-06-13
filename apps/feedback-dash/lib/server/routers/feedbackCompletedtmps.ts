import { getFeedbackCompletedtmpById, getFeedbackCompletedtmps } from "@/lib/api/feedbackCompletedtmps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackCompletedtmpIdSchema,
  insertFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpParams,
} from "@/lib/db/schema/feedbackCompletedtmps";
import { createFeedbackCompletedtmp, deleteFeedbackCompletedtmp, updateFeedbackCompletedtmp } from "@/lib/api/feedbackCompletedtmps/mutations";

export const feedbackCompletedtmpsRouter = router({
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
