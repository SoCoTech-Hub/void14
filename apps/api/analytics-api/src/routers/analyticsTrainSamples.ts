import {
  analyticsTrainSampleIdSchema,
  insertAnalyticsTrainSampleParams,
  updateAnalyticsTrainSampleParams,
} from "@soco/analytics-db/schema/analyticsTrainSamples";

import {
  createAnalyticsTrainSample,
  deleteAnalyticsTrainSample,
  updateAnalyticsTrainSample,
} from "../api/analyticsTrainSamples/mutations";
import {
  getAnalyticsTrainSampleById,
  getAnalyticsTrainSamples,
} from "../api/analyticsTrainSamples/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsTrainSamplesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAnalyticsTrainSamples: publicProcedure.query(async () => {
      return getAnalyticsTrainSamples();
    }),
    getAnalyticsTrainSampleById: publicProcedure
      .input(analyticsTrainSampleIdSchema)
      .query(async ({ input }) => {
        return getAnalyticsTrainSampleById(input.id);
      }),
    createAnalyticsTrainSample: publicProcedure
      .input(insertAnalyticsTrainSampleParams)
      .mutation(async ({ input }) => {
        return createAnalyticsTrainSample(input);
      }),
    updateAnalyticsTrainSample: publicProcedure
      .input(updateAnalyticsTrainSampleParams)
      .mutation(async ({ input }) => {
        return updateAnalyticsTrainSample(input.id, input);
      }),
    deleteAnalyticsTrainSample: publicProcedure
      .input(analyticsTrainSampleIdSchema)
      .mutation(async ({ input }) => {
        return deleteAnalyticsTrainSample(input.id);
      }),
  });
