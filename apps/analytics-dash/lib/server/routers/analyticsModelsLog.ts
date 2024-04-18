import { getAnalyticsModelsLogById, getAnalyticsModelsLog } from "@/lib/api/analyticsModelsLog/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsModelsLogIdSchema,
  insertAnalyticsModelsLogParams,
  updateAnalyticsModelsLogParams,
} from "@/lib/db/schema/analyticsModelsLog";
import { createAnalyticsModelsLog, deleteAnalyticsModelsLog, updateAnalyticsModelsLog } from "@/lib/api/analyticsModelsLog/mutations";

export const analyticsModelsLogRouter = router({
  getAnalyticsModelsLog: publicProcedure.query(async () => {
    return getAnalyticsModelsLog();
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
