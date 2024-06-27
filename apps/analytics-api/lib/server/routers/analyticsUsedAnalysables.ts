import { getAnalyticsUsedAnalysableById, getAnalyticsUsedAnalysables } from "@/lib/api/analyticsUsedAnalysables/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsUsedAnalysableIdSchema,
  insertAnalyticsUsedAnalysableParams,
  updateAnalyticsUsedAnalysableParams,
} from "@/lib/db/schema/analyticsUsedAnalysables";
import { createAnalyticsUsedAnalysable, deleteAnalyticsUsedAnalysable, updateAnalyticsUsedAnalysable } from "@/lib/api/analyticsUsedAnalysables/mutations";

export const analyticsUsedAnalysablesRouter = router({
  getAnalyticsUsedAnalysables: publicProcedure.query(async () => {
    return getAnalyticsUsedAnalysables();
  }),
  getAnalyticsUsedAnalysableById: publicProcedure.input(analyticsUsedAnalysableIdSchema).query(async ({ input }) => {
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
