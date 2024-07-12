import {
  analyticsPredictSampleIdSchema,
  insertAnalyticsPredictSampleParams,
  updateAnalyticsPredictSampleParams,
} from "@soco/analytics-db/schema/analyticsPredictSamples";

import {
  createAnalyticsPredictSample,
  deleteAnalyticsPredictSample,
  updateAnalyticsPredictSample,
} from "../api/analyticsPredictSamples/mutations";
import {
  getAnalyticsPredictSampleById,
  getAnalyticsPredictSamples,
} from "../api/analyticsPredictSamples/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsPredictSamplesRouter = createTRPCRouter({
  getAnalyticsPredictSamples: publicProcedure.query(async () => {
    return getAnalyticsPredictSamples();
  }),
  getAnalyticsPredictSampleById: publicProcedure
    .input(analyticsPredictSampleIdSchema)
    .query(async ({ input }) => {
      return getAnalyticsPredictSampleById(input.id);
    }),
  createAnalyticsPredictSample: publicProcedure
    .input(insertAnalyticsPredictSampleParams)
    .mutation(async ({ input }) => {
      return createAnalyticsPredictSample(input);
    }),
  updateAnalyticsPredictSample: publicProcedure
    .input(updateAnalyticsPredictSampleParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsPredictSample(input.id, input);
    }),
  deleteAnalyticsPredictSample: publicProcedure
    .input(analyticsPredictSampleIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsPredictSample(input.id);
    }),
});
