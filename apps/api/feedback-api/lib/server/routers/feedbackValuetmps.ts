import {
  createFeedbackValuetmp,
  deleteFeedbackValuetmp,
  updateFeedbackValuetmp,
} from "../api/feedbackValuetmps/mutations";
import {
  getFeedbackValuetmpById,
  getFeedbackValuetmps,
} from "../api/feedbackValuetmps/queries";
import {
  feedbackValuetmpIdSchema,
  insertFeedbackValuetmpParams,
  updateFeedbackValuetmpParams,
} from "../db/schema/feedbackValuetmps";
import { publicProcedure, router } from "../server/trpc";

export const feedbackValuetmpsRouter = router({
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
