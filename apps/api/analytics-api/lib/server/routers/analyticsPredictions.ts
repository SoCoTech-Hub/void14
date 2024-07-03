import { getAnalyticsPredictionById, getAnalyticsPredictions } from "@/lib/api/analyticsPredictions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsPredictionIdSchema,
  insertAnalyticsPredictionParams,
  updateAnalyticsPredictionParams,
} from "@/lib/db/schema/analyticsPredictions";
import { createAnalyticsPrediction, deleteAnalyticsPrediction, updateAnalyticsPrediction } from "@/lib/api/analyticsPredictions/mutations";

export const analyticsPredictionsRouter = router({
  getAnalyticsPredictions: publicProcedure.query(async () => {
    return getAnalyticsPredictions();
  }),
  getAnalyticsPredictionById: publicProcedure.input(analyticsPredictionIdSchema).query(async ({ input }) => {
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
