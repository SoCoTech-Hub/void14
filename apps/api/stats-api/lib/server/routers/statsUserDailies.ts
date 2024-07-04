import {
  createStatsUserDaily,
  deleteStatsUserDaily,
  updateStatsUserDaily,
} from "../api/statsUserDailies/mutations";
import {
  getStatsUserDailies,
  getStatsUserDailyById,
} from "../api/statsUserDailies/queries";
import {
  insertStatsUserDailyParams,
  statsUserDailyIdSchema,
  updateStatsUserDailyParams,
} from "../db/schema/statsUserDailies";
import { publicProcedure, router } from "../server/trpc";

export const statsUserDailiesRouter = router({
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
