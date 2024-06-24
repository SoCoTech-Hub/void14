import { getStatsUserWeeklyById, getStatsUserWeeklies } from "@/lib/api/statsUserWeeklies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  statsUserWeeklyIdSchema,
  insertStatsUserWeeklyParams,
  updateStatsUserWeeklyParams,
} from "@/lib/db/schema/statsUserWeeklies";
import { createStatsUserWeekly, deleteStatsUserWeekly, updateStatsUserWeekly } from "@/lib/api/statsUserWeeklies/mutations";

export const statsUserWeekliesRouter = router({
  getStatsUserWeeklies: publicProcedure.query(async () => {
    return getStatsUserWeeklies();
  }),
  getStatsUserWeeklyById: publicProcedure.input(statsUserWeeklyIdSchema).query(async ({ input }) => {
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
