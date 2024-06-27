import { getStatsMonthlyById, getStatsMonthlies } from "@/lib/api/statsMonthlies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  statsMonthlyIdSchema,
  insertStatsMonthlyParams,
  updateStatsMonthlyParams,
} from "@/lib/db/schema/statsMonthlies";
import { createStatsMonthly, deleteStatsMonthly, updateStatsMonthly } from "@/lib/api/statsMonthlies/mutations";

export const statsMonthliesRouter = router({
  getStatsMonthlies: publicProcedure.query(async () => {
    return getStatsMonthlies();
  }),
  getStatsMonthlyById: publicProcedure.input(statsMonthlyIdSchema).query(async ({ input }) => {
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
