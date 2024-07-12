import {
  insertStatsDailyParams,
  statsDailyIdSchema,
  updateStatsDailyParams,
} from "@soco/stats-db/schema/statsDailies";

import {
  createStatsDaily,
  deleteStatsDaily,
  updateStatsDaily,
} from "../api/statsDailies/mutations";
import {
  getStatsDailies,
  getStatsDailyById,
} from "../api/statsDailies/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const statsDailiesRouter = createTRPCRouter({
  getStatsDailies: publicProcedure.query(async () => {
    return getStatsDailies();
  }),
  getStatsDailyById: publicProcedure
    .input(statsDailyIdSchema)
    .query(async ({ input }) => {
      return getStatsDailyById(input.id);
    }),
  createStatsDaily: publicProcedure
    .input(insertStatsDailyParams)
    .mutation(async ({ input }) => {
      return createStatsDaily(input);
    }),
  updateStatsDaily: publicProcedure
    .input(updateStatsDailyParams)
    .mutation(async ({ input }) => {
      return updateStatsDaily(input.id, input);
    }),
  deleteStatsDaily: publicProcedure
    .input(statsDailyIdSchema)
    .mutation(async ({ input }) => {
      return deleteStatsDaily(input.id);
    }),
});
