import { getAnalyticsTrainSampleById, getAnalyticsTrainSamples } from "@/lib/api/analyticsTrainSamples/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsTrainSampleIdSchema,
  insertAnalyticsTrainSampleParams,
  updateAnalyticsTrainSampleParams,
} from "@/lib/db/schema/analyticsTrainSamples";
import { createAnalyticsTrainSample, deleteAnalyticsTrainSample, updateAnalyticsTrainSample } from "@/lib/api/analyticsTrainSamples/mutations";

export const analyticsTrainSamplesRouter = router({
  getAnalyticsTrainSamples: publicProcedure.query(async () => {
    return getAnalyticsTrainSamples();
  }),
  getAnalyticsTrainSampleById: publicProcedure.input(analyticsTrainSampleIdSchema).query(async ({ input }) => {
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
