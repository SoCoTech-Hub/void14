import {
  createAnalyticsPrediction,
  deleteAnalyticsPrediction,
  updateAnalyticsPrediction,
} from "../api/analyticsPredictions/mutations";
import {
  getAnalyticsPredictionById,
  getAnalyticsPredictions,
} from "../api/analyticsPredictions/queries";
import {
  analyticsPredictionIdSchema,
  insertAnalyticsPredictionParams,
  updateAnalyticsPredictionParams,
} from "../db/schema/analyticsPredictions";
import { publicProcedure, router } from "../server/trpc";

export const analyticsPredictionsRouter = router({
  getAnalyticsPredictions: publicProcedure.query(async () => {
    return getAnalyticsPredictions();
  }),
  getAnalyticsPredictionById: publicProcedure
    .input(analyticsPredictionIdSchema)
    .query(async ({ input }) => {
      return getAnalyticsPredictionById(input.id);
    }),
  createAnalyticsPrediction: publicProcedure
    .input(insertAnalyticsPredictionParams)
    .mutation(async ({ input }) => {
      return createAnalyticsPrediction(input);
    }),
  updateAnalyticsPrediction: publicProcedure
    .input(updateAnalyticsPredictionParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsPrediction(input.id, input);
    }),
  deleteAnalyticsPrediction: publicProcedure
    .input(analyticsPredictionIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsPrediction(input.id);
    }),
});
