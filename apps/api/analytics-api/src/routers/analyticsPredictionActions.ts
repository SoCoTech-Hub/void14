import {
  analyticsPredictionActionIdSchema,
  insertAnalyticsPredictionActionParams,
  updateAnalyticsPredictionActionParams,
} from "@soco/analytics-db/schema/analyticsPredictionActions";

import {
  createAnalyticsPredictionAction,
  deleteAnalyticsPredictionAction,
  updateAnalyticsPredictionAction,
} from "../api/analyticsPredictionActions/mutations";
import {
  getAnalyticsPredictionActionById,
  getAnalyticsPredictionActions,
} from "../api/analyticsPredictionActions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsPredictionActionsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getAnalyticsPredictionActions: publicProcedure.query(async () => {
    return getAnalyticsPredictionActions();
  }),
  getAnalyticsPredictionActionById: publicProcedure
    .input(analyticsPredictionActionIdSchema)
    .query(async ({ input }) => {
      return getAnalyticsPredictionActionById(input.id);
    }),
  createAnalyticsPredictionAction: publicProcedure
    .input(insertAnalyticsPredictionActionParams)
    .mutation(async ({ input }) => {
      return createAnalyticsPredictionAction(input);
    }),
  updateAnalyticsPredictionAction: publicProcedure
    .input(updateAnalyticsPredictionActionParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsPredictionAction(input.id, input);
    }),
  deleteAnalyticsPredictionAction: publicProcedure
    .input(analyticsPredictionActionIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsPredictionAction(input.id);
    }),
});
