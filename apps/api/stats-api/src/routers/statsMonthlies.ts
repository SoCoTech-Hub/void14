import {
  insertStatsMonthlyParams,
  statsMonthlyIdSchema,
  updateStatsMonthlyParams,
} from "@soco/stats-db/schema/statsMonthlies";

import {
  createStatsMonthly,
  deleteStatsMonthly,
  updateStatsMonthly,
} from "../api/statsMonthlies/mutations";
import {
  getStatsMonthlies,
  getStatsMonthlyById,
} from "../api/statsMonthlies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const statsMonthliesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
