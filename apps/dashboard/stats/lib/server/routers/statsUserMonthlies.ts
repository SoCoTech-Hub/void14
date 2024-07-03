import { getStatsUserMonthlyById, getStatsUserMonthlies } from "@/lib/api/statsUserMonthlies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  statsUserMonthlyIdSchema,
  insertStatsUserMonthlyParams,
  updateStatsUserMonthlyParams,
} from "@/lib/db/schema/statsUserMonthlies";
import { createStatsUserMonthly, deleteStatsUserMonthly, updateStatsUserMonthly } from "@/lib/api/statsUserMonthlies/mutations";

export const statsUserMonthliesRouter = router({
  getStatsUserMonthlies: publicProcedure.query(async () => {
    return getStatsUserMonthlies();
  }),
  getStatsUserMonthlyById: publicProcedure.input(statsUserMonthlyIdSchema).query(async ({ input }) => {
    return getStatsUserMonthlyById(input.id);
  }),
  createStatsUserMonthly: publicProcedure
    .input(insertStatsUserMonthlyParams)
    .mutation(async ({ input }) => {
      return createStatsUserMonthly(input);
    }),
  updateStatsUserMonthly: publicProcedure
    .input(updateStatsUserMonthlyParams)
    .mutation(async ({ input }) => {
      return updateStatsUserMonthly(input.id, input);
    }),
  deleteStatsUserMonthly: publicProcedure
    .input(statsUserMonthlyIdSchema)
    .mutation(async ({ input }) => {
      return deleteStatsUserMonthly(input.id);
    }),
});
