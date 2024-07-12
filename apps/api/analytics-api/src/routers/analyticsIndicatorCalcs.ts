import {
  analyticsIndicatorCalcIdSchema,
  insertAnalyticsIndicatorCalcParams,
  updateAnalyticsIndicatorCalcParams,
} from "@soco/analytics-db/schema/analyticsIndicatorCalcs";

import {
  createAnalyticsIndicatorCalc,
  deleteAnalyticsIndicatorCalc,
  updateAnalyticsIndicatorCalc,
} from "../api/analyticsIndicatorCalcs/mutations";
import {
  getAnalyticsIndicatorCalcById,
  getAnalyticsIndicatorCalcs,
} from "../api/analyticsIndicatorCalcs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsIndicatorCalcsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getAnalyticsIndicatorCalcs: publicProcedure.query(async () => {
    return getAnalyticsIndicatorCalcs();
  }),
  getAnalyticsIndicatorCalcById: publicProcedure
    .input(analyticsIndicatorCalcIdSchema)
    .query(async ({ input }) => {
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
