import { getAnalyticsModelsLogById, getAnalyticsModelsLogs } from "@/lib/api/analyticsModelsLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsModelsLogIdSchema,
  insertAnalyticsModelsLogParams,
  updateAnalyticsModelsLogParams,
} from "@/lib/db/schema/analyticsModelsLogs";
import { createAnalyticsModelsLog, deleteAnalyticsModelsLog, updateAnalyticsModelsLog } from "@/lib/api/analyticsModelsLogs/mutations";

export const analyticsModelsLogsRouter = router({
  getAnalyticsModelsLogs: publicProcedure.query(async () => {
    return getAnalyticsModelsLogs();
  }),
  getAnalyticsModelsLogById: publicProcedure.input(analyticsModelsLogIdSchema).query(async ({ input }) => {
    return getAnalyticsModelsLogById(input.id);
  }),
  createAnalyticsModelsLog: publicProcedure
    .input(insertAnalyticsModelsLogParams)
    .mutation(async ({ input }) => {
      return createAnalyticsModelsLog(input);
    }),
  updateAnalyticsModelsLog: publicProcedure
    .input(updateAnalyticsModelsLogParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsModelsLog(input.id, input);
    }),
  deleteAnalyticsModelsLog: publicProcedure
    .input(analyticsModelsLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsModelsLog(input.id);
    }),
});
