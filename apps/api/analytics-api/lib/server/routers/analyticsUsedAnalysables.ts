import {
  createAnalyticsUsedAnalysable,
  deleteAnalyticsUsedAnalysable,
  updateAnalyticsUsedAnalysable,
} from "../api/analyticsUsedAnalysables/mutations";
import {
  getAnalyticsUsedAnalysableById,
  getAnalyticsUsedAnalysables,
} from "../api/analyticsUsedAnalysables/queries";
import {
  analyticsUsedAnalysableIdSchema,
  insertAnalyticsUsedAnalysableParams,
  updateAnalyticsUsedAnalysableParams,
} from "../db/schema/analyticsUsedAnalysables";
import { publicProcedure, router } from "../server/trpc";

export const analyticsUsedAnalysablesRouter = router({
  getAnalyticsUsedAnalysables: publicProcedure.query(async () => {
    return getAnalyticsUsedAnalysables();
  }),
  getAnalyticsUsedAnalysableById: publicProcedure
    .input(analyticsUsedAnalysableIdSchema)
    .query(async ({ input }) => {
      return getAnalyticsUsedAnalysableById(input.id);
    }),
  createAnalyticsUsedAnalysable: publicProcedure
    .input(insertAnalyticsUsedAnalysableParams)
    .mutation(async ({ input }) => {
      return createAnalyticsUsedAnalysable(input);
    }),
  updateAnalyticsUsedAnalysable: publicProcedure
    .input(updateAnalyticsUsedAnalysableParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsUsedAnalysable(input.id, input);
    }),
  deleteAnalyticsUsedAnalysable: publicProcedure
    .input(analyticsUsedAnalysableIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsUsedAnalysable(input.id);
    }),
});
