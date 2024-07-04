import {
  createStatsWeekly,
  deleteStatsWeekly,
  updateStatsWeekly,
} from "../api/statsWeeklies/mutations";
import {
  getStatsWeeklies,
  getStatsWeeklyById,
} from "../api/statsWeeklies/queries";
import {
  insertStatsWeeklyParams,
  statsWeeklyIdSchema,
  updateStatsWeeklyParams,
} from "../db/schema/statsWeeklies";
import { publicProcedure, router } from "../server/trpc";

export const statsWeekliesRouter = router({
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
