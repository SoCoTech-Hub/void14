import { getStatsWeeklyById, getStatsWeeklies } from "../api/statsWeeklies/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  statsWeeklyIdSchema,
  insertStatsWeeklyParams,
  updateStatsWeeklyParams,
} from "@soco/stats-db/schema/statsWeeklies";
import { createStatsWeekly, deleteStatsWeekly, updateStatsWeekly } from "../api/statsWeeklies/mutations";

export const statsWeekliesRouter =createTRPCRouter({
  getStatsWeeklies: publicProcedure.query(async () => {
    return getStatsWeeklies();
  }),
  getStatsWeeklyById: publicProcedure.input(statsWeeklyIdSchema).query(async ({ input }) => {
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
