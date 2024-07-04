import {
  createAnalyticsTrainSample,
  deleteAnalyticsTrainSample,
  updateAnalyticsTrainSample,
} from "../api/analyticsTrainSamples/mutations";
import {
  getAnalyticsTrainSampleById,
  getAnalyticsTrainSamples,
} from "../api/analyticsTrainSamples/queries";
import {
  analyticsTrainSampleIdSchema,
  insertAnalyticsTrainSampleParams,
  updateAnalyticsTrainSampleParams,
} from "../db/schema/analyticsTrainSamples";
import { publicProcedure, router } from "../server/trpc";

export const analyticsTrainSamplesRouter = router({
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
