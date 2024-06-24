import { getStatsDailyById, getStatsDailies } from "@/lib/api/statsDailies/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  statsDailyIdSchema,
  insertStatsDailyParams,
  updateStatsDailyParams,
} from "@/lib/db/schema/statsDailies";
import { createStatsDaily, deleteStatsDaily, updateStatsDaily } from "@/lib/api/statsDailies/mutations";

export const statsDailiesRouter = router({
  getStatsDailies: publicProcedure.query(async () => {
    return getStatsDailies();
  }),
  getStatsDailyById: publicProcedure.input(statsDailyIdSchema).query(async ({ input }) => {
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
