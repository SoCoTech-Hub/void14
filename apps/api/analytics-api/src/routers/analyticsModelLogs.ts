import {
  analyticsModelLogIdSchema,
  insertAnalyticsModelLogParams,
  updateAnalyticsModelLogParams,
} from "@soco/analytics-db/schema/analyticsModelLogs";

import {
  createAnalyticsModelLog,
  deleteAnalyticsModelLog,
  updateAnalyticsModelLog,
} from "../api/analyticsModelLogs/mutations";
import {
  getAnalyticsModelLogById,
  getAnalyticsModelLogs,
} from "../api/analyticsModelLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsModelLogsRouter = createTRPCRouter({
  getAnalyticsModelLogs: publicProcedure.query(async () => {
    return getAnalyticsModelLogs();
  }),
  getAnalyticsModelLogById: publicProcedure
    .input(analyticsModelLogIdSchema)
    .query(async ({ input }) => {
      return getAnalyticsModelLogById(input.id);
    }),
  createAnalyticsModelLog: publicProcedure
    .input(insertAnalyticsModelLogParams)
    .mutation(async ({ input }) => {
      return createAnalyticsModelLog(input);
    }),
  updateAnalyticsModelLog: publicProcedure
    .input(updateAnalyticsModelLogParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsModelLog(input.id, input);
    }),
  deleteAnalyticsModelLog: publicProcedure
    .input(analyticsModelLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsModelLog(input.id);
    }),
});
