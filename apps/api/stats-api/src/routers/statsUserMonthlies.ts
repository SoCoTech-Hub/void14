import {
  insertStatsUserMonthlyParams,
  statsUserMonthlyIdSchema,
  updateStatsUserMonthlyParams,
} from "@soco/stats-db/schema/statsUserMonthlies";

import {
  createStatsUserMonthly,
  deleteStatsUserMonthly,
  updateStatsUserMonthly,
} from "../api/statsUserMonthlies/mutations";
import {
  getStatsUserMonthlies,
  getStatsUserMonthlyById,
} from "../api/statsUserMonthlies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const statsUserMonthliesRouter = createTRPCRouter({
  getStatsUserMonthlies: publicProcedure.query(async () => {
    return getStatsUserMonthlies();
  }),
  getStatsUserMonthlyById: publicProcedure
    .input(statsUserMonthlyIdSchema)
    .query(async ({ input }) => {
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
