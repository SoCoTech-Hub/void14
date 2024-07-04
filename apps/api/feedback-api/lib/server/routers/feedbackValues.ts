import {
  createFeedbackValue,
  deleteFeedbackValue,
  updateFeedbackValue,
} from "../api/feedbackValues/mutations";
import {
  getFeedbackValueById,
  getFeedbackValues,
} from "../api/feedbackValues/queries";
import {
  feedbackValueIdSchema,
  insertFeedbackValueParams,
  updateFeedbackValueParams,
} from "../db/schema/feedbackValues";
import { publicProcedure, router } from "../server/trpc";

export const feedbackValuesRouter = router({
  getFeedbackValues: publicProcedure.query(async () => {
    return getFeedbackValues();
  }),
  getFeedbackValueById: publicProcedure
    .input(feedbackValueIdSchema)
    .query(async ({ input }) => {
      return getFeedbackValueById(input.id);
    }),
  createFeedbackValue: publicProcedure
    .input(insertFeedbackValueParams)
    .mutation(async ({ input }) => {
      return createFeedbackValue(input);
    }),
  updateFeedbackValue: publicProcedure
    .input(updateFeedbackValueParams)
    .mutation(async ({ input }) => {
      return updateFeedbackValue(input.id, input);
    }),
  deleteFeedbackValue: publicProcedure
    .input(feedbackValueIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeedbackValue(input.id);
    }),
});
