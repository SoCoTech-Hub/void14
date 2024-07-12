import {
  insertStatsWeeklyParams,
  statsWeeklyIdSchema,
  updateStatsWeeklyParams,
} from "@soco/stats-db/schema/statsWeeklies";

import {
  createStatsWeekly,
  deleteStatsWeekly,
  updateStatsWeekly,
} from "../api/statsWeeklies/mutations";
import {
  getStatsWeeklies,
  getStatsWeeklyById,
} from "../api/statsWeeklies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const statsWeekliesRouter = createTRPCRouter({
  getStatsWeeklies: publicProcedure.query(async () => {
    return getStatsWeeklies();
  }),
  getStatsWeeklyById: publicProcedure
    .input(statsWeeklyIdSchema)
    .query(async ({ input }) => {
      return getStatsWeeklyById(input.id);
    }),
  createStatsWeekly: publicProcedure
    .input(insertStatsWeeklyParams)
    .mutation(async ({ input }) => {
      return createStatsWeekly(input);
    }),
  updateStatsWeekly: publicProcedure
    .input(updateStatsWeeklyParams)
    .mutation(async ({ input }) => {
      return updateStatsWeekly(input.id, input);
    }),
  deleteStatsWeekly: publicProcedure
    .input(statsWeeklyIdSchema)
    .mutation(async ({ input }) => {
      return deleteStatsWeekly(input.id);
    }),
});
