import {
  insertStatsUserDailyParams,
  statsUserDailyIdSchema,
  updateStatsUserDailyParams,
} from "@soco/stats-db/schema/statsUserDailies";

import {
  createStatsUserDaily,
  deleteStatsUserDaily,
  updateStatsUserDaily,
} from "../api/statsUserDailies/mutations";
import {
  getStatsUserDailies,
  getStatsUserDailyById,
} from "../api/statsUserDailies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const statsUserDailiesRouter = createTRPCRouter({
  getStatsUserDailies: publicProcedure.query(async () => {
    return getStatsUserDailies();
  }),
  getStatsUserDailyById: publicProcedure
    .input(statsUserDailyIdSchema)
    .query(async ({ input }) => {
      return getStatsUserDailyById(input.id);
    }),
  createStatsUserDaily: publicProcedure
    .input(insertStatsUserDailyParams)
    .mutation(async ({ input }) => {
      return createStatsUserDaily(input);
    }),
  updateStatsUserDaily: publicProcedure
    .input(updateStatsUserDailyParams)
    .mutation(async ({ input }) => {
      return updateStatsUserDaily(input.id, input);
    }),
  deleteStatsUserDaily: publicProcedure
    .input(statsUserDailyIdSchema)
    .mutation(async ({ input }) => {
      return deleteStatsUserDaily(input.id);
    }),
});
