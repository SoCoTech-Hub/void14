import { getStatsMonthlyById, getStatsMonthlies } from "../api/statsMonthlies/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  statsMonthlyIdSchema,
  insertStatsMonthlyParams,
  updateStatsMonthlyParams,
} from "@soco/stats-db/schema/statsMonthlies";
import { createStatsMonthly, deleteStatsMonthly, updateStatsMonthly } from "../api/statsMonthlies/mutations";

export const statsMonthliesRouter =createTRPCRouter({
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
