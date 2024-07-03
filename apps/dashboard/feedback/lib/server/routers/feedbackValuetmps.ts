import { getFeedbackValuetmpById, getFeedbackValuetmps } from "@/lib/api/feedbackValuetmps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackValuetmpIdSchema,
  insertFeedbackValuetmpParams,
  updateFeedbackValuetmpParams,
} from "@/lib/db/schema/feedbackValuetmps";
import { createFeedbackValuetmp, deleteFeedbackValuetmp, updateFeedbackValuetmp } from "@/lib/api/feedbackValuetmps/mutations";

export const feedbackValuetmpsRouter = router({
  getFeedbackValuetmps: publicProcedure.query(async () => {
    return getFeedbackValuetmps();
  }),
  getFeedbackValuetmpById: publicProcedure.input(feedbackValuetmpIdSchema).query(async ({ input }) => {
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
