import { getAnalyticsUsedAnalysableById, getAnalyticsUsedAnalysables } from "../api/analyticsUsedAnalysables/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  analyticsUsedAnalysableIdSchema,
  insertAnalyticsUsedAnalysableParams,
  updateAnalyticsUsedAnalysableParams,
} from "@soco/analytics-db/schema/analyticsUsedAnalysables";
import { createAnalyticsUsedAnalysable, deleteAnalyticsUsedAnalysable, updateAnalyticsUsedAnalysable } from "../api/analyticsUsedAnalysables/mutations";

export const analyticsUsedAnalysablesRouter =createTRPCRouter({
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
