import { getAnalyticsIndicatorCalcById, getAnalyticsIndicatorCalcs } from "@/lib/api/analyticsIndicatorCalcs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsIndicatorCalcIdSchema,
  insertAnalyticsIndicatorCalcParams,
  updateAnalyticsIndicatorCalcParams,
} from "@/lib/db/schema/analyticsIndicatorCalcs";
import { createAnalyticsIndicatorCalc, deleteAnalyticsIndicatorCalc, updateAnalyticsIndicatorCalc } from "@/lib/api/analyticsIndicatorCalcs/mutations";

export const analyticsIndicatorCalcsRouter = router({
  getAnalyticsIndicatorCalcs: publicProcedure.query(async () => {
    return getAnalyticsIndicatorCalcs();
  }),
  getAnalyticsIndicatorCalcById: publicProcedure.input(analyticsIndicatorCalcIdSchema).query(async ({ input }) => {
    return getAnalyticsIndicatorCalcById(input.id);
  }),
  createAnalyticsIndicatorCalc: publicProcedure
    .input(insertAnalyticsIndicatorCalcParams)
    .mutation(async ({ input }) => {
      return createAnalyticsIndicatorCalc(input);
    }),
  updateAnalyticsIndicatorCalc: publicProcedure
    .input(updateAnalyticsIndicatorCalcParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsIndicatorCalc(input.id, input);
    }),
  deleteAnalyticsIndicatorCalc: publicProcedure
    .input(analyticsIndicatorCalcIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsIndicatorCalc(input.id);
    }),
});
