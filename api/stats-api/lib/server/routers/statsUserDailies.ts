import { getStatsUserDailyById, getStatsUserDailies } from "@/lib/api/statsUserDailies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  statsUserDailyIdSchema,
  insertStatsUserDailyParams,
  updateStatsUserDailyParams,
} from "@/lib/db/schema/statsUserDailies";
import { createStatsUserDaily, deleteStatsUserDaily, updateStatsUserDaily } from "@/lib/api/statsUserDailies/mutations";

export const statsUserDailiesRouter = router({
  getStatsUserDailies: publicProcedure.query(async () => {
    return getStatsUserDailies();
  }),
  getStatsUserDailyById: publicProcedure.input(statsUserDailyIdSchema).query(async ({ input }) => {
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
