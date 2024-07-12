import {
  analyticsPredictionIdSchema,
  insertAnalyticsPredictionParams,
  updateAnalyticsPredictionParams,
} from "@soco/analytics-db/schema/analyticsPredictions";

import {
  createAnalyticsPrediction,
  deleteAnalyticsPrediction,
  updateAnalyticsPrediction,
} from "../api/analyticsPredictions/mutations";
import {
  getAnalyticsPredictionById,
  getAnalyticsPredictions,
} from "../api/analyticsPredictions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsPredictionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
