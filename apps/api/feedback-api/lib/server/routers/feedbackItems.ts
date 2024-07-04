import {
  createFeedbackItem,
  deleteFeedbackItem,
  updateFeedbackItem,
} from "../api/feedbackItems/mutations";
import {
  getFeedbackItemById,
  getFeedbackItems,
} from "../api/feedbackItems/queries";
import {
  feedbackItemIdSchema,
  insertFeedbackItemParams,
  updateFeedbackItemParams,
} from "../db/schema/feedbackItems";
import { publicProcedure, router } from "../server/trpc";

export const feedbackItemsRouter = router({
  getFeedbackItems: publicProcedure.query(async () => {
    return getFeedbackItems();
  }),
  getFeedbackItemById: publicProcedure
    .input(feedbackItemIdSchema)
    .query(async ({ input }) => {
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
