import {
  createStatsUserWeekly,
  deleteStatsUserWeekly,
  updateStatsUserWeekly,
} from "../api/statsUserWeeklies/mutations";
import {
  getStatsUserWeeklies,
  getStatsUserWeeklyById,
} from "../api/statsUserWeeklies/queries";
import {
  insertStatsUserWeeklyParams,
  statsUserWeeklyIdSchema,
  updateStatsUserWeeklyParams,
} from "../db/schema/statsUserWeeklies";
import { publicProcedure, router } from "../server/trpc";

export const statsUserWeekliesRouter = router({
  getStatsUserWeeklies: publicProcedure.query(async () => {
    return getStatsUserWeeklies();
  }),
  getStatsUserWeeklyById: publicProcedure
    .input(statsUserWeeklyIdSchema)
    .query(async ({ input }) => {
      return getStatsUserWeeklyById(input.id);
    }),
  createStatsUserWeekly: publicProcedure
    .input(insertStatsUserWeeklyParams)
    .mutation(async ({ input }) => {
      return createStatsUserWeekly(input);
    }),
  updateStatsUserWeekly: publicProcedure
    .input(updateStatsUserWeeklyParams)
    .mutation(async ({ input }) => {
      return updateStatsUserWeekly(input.id, input);
    }),
  deleteStatsUserWeekly: publicProcedure
    .input(statsUserWeeklyIdSchema)
    .mutation(async ({ input }) => {
      return deleteStatsUserWeekly(input.id);
    }),
});
