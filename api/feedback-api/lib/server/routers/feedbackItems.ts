import { getFeedbackItemById, getFeedbackItems } from "@/lib/api/feedbackItems/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackItemIdSchema,
  insertFeedbackItemParams,
  updateFeedbackItemParams,
} from "@/lib/db/schema/feedbackItems";
import { createFeedbackItem, deleteFeedbackItem, updateFeedbackItem } from "@/lib/api/feedbackItems/mutations";

export const feedbackItemsRouter = router({
  getFeedbackItems: publicProcedure.query(async () => {
    return getFeedbackItems();
  }),
  getFeedbackItemById: publicProcedure.input(feedbackItemIdSchema).query(async ({ input }) => {
    return getFeedbackItemById(input.id);
  }),
  createFeedbackItem: publicProcedure
    .input(insertFeedbackItemParams)
    .mutation(async ({ input }) => {
      return createFeedbackItem(input);
    }),
  updateFeedbackItem: publicProcedure
    .input(updateFeedbackItemParams)
    .mutation(async ({ input }) => {
      return updateFeedbackItem(input.id, input);
    }),
  deleteFeedbackItem: publicProcedure
    .input(feedbackItemIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeedbackItem(input.id);
    }),
});
