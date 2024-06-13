import { getFeedbackValueById, getFeedbackValues } from "@/lib/api/feedbackValues/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackValueIdSchema,
  insertFeedbackValueParams,
  updateFeedbackValueParams,
} from "@/lib/db/schema/feedbackValues";
import { createFeedbackValue, deleteFeedbackValue, updateFeedbackValue } from "@/lib/api/feedbackValues/mutations";

export const feedbackValuesRouter = router({
  getFeedbackValues: publicProcedure.query(async () => {
    return getFeedbackValues();
  }),
  getFeedbackValueById: publicProcedure.input(feedbackValueIdSchema).query(async ({ input }) => {
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
