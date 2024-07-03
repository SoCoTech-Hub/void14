import { getAnalyticsPredictSampleById, getAnalyticsPredictSamples } from "@/lib/api/analyticsPredictSamples/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsPredictSampleIdSchema,
  insertAnalyticsPredictSampleParams,
  updateAnalyticsPredictSampleParams,
} from "@/lib/db/schema/analyticsPredictSamples";
import { createAnalyticsPredictSample, deleteAnalyticsPredictSample, updateAnalyticsPredictSample } from "@/lib/api/analyticsPredictSamples/mutations";

export const analyticsPredictSamplesRouter = router({
  getAnalyticsPredictSamples: publicProcedure.query(async () => {
    return getAnalyticsPredictSamples();
  }),
  getAnalyticsPredictSampleById: publicProcedure.input(analyticsPredictSampleIdSchema).query(async ({ input }) => {
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
