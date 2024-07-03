import { getStatsWeeklyById, getStatsWeeklies } from "@/lib/api/statsWeeklies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  statsWeeklyIdSchema,
  insertStatsWeeklyParams,
  updateStatsWeeklyParams,
} from "@/lib/db/schema/statsWeeklies";
import { createStatsWeekly, deleteStatsWeekly, updateStatsWeekly } from "@/lib/api/statsWeeklies/mutations";

export const statsWeekliesRouter = router({
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
