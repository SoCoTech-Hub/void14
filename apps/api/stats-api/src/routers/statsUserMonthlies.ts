import { getStatsUserMonthlyById, getStatsUserMonthlies } from "../api/statsUserMonthlies/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  statsUserMonthlyIdSchema,
  insertStatsUserMonthlyParams,
  updateStatsUserMonthlyParams,
} from "@soco/stats-db/schema/statsUserMonthlies";
import { createStatsUserMonthly, deleteStatsUserMonthly, updateStatsUserMonthly } from "../api/statsUserMonthlies/mutations";

export const statsUserMonthliesRouter =createTRPCRouter({
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
