import {
  createStatsMonthly,
  deleteStatsMonthly,
  updateStatsMonthly,
} from "../api/statsMonthlies/mutations";
import {
  getStatsMonthlies,
  getStatsMonthlyById,
} from "../api/statsMonthlies/queries";
import {
  insertStatsMonthlyParams,
  statsMonthlyIdSchema,
  updateStatsMonthlyParams,
} from "../db/schema/statsMonthlies";
import { publicProcedure, router } from "../server/trpc";

export const statsMonthliesRouter = router({
  getStatsMonthlies: publicProcedure.query(async () => {
    return getStatsMonthlies();
  }),
  getStatsMonthlyById: publicProcedure
    .input(statsMonthlyIdSchema)
    .query(async ({ input }) => {
      return getStatsMonthlyById(input.id);
    }),
  createStatsMonthly: publicProcedure
    .input(insertStatsMonthlyParams)
    .mutation(async ({ input }) => {
      return createStatsMonthly(input);
    }),
  updateStatsMonthly: publicProcedure
    .input(updateStatsMonthlyParams)
    .mutation(async ({ input }) => {
      return updateStatsMonthly(input.id, input);
    }),
  deleteStatsMonthly: publicProcedure
    .input(statsMonthlyIdSchema)
    .mutation(async ({ input }) => {
      return deleteStatsMonthly(input.id);
    }),
});
