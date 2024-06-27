import { getAnalyticsPredictionActionById, getAnalyticsPredictionActions } from "@/lib/api/analyticsPredictionActions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsPredictionActionIdSchema,
  insertAnalyticsPredictionActionParams,
  updateAnalyticsPredictionActionParams,
} from "@/lib/db/schema/analyticsPredictionActions";
import { createAnalyticsPredictionAction, deleteAnalyticsPredictionAction, updateAnalyticsPredictionAction } from "@/lib/api/analyticsPredictionActions/mutations";

export const analyticsPredictionActionsRouter = router({
  getAnalyticsPredictionActions: publicProcedure.query(async () => {
    return getAnalyticsPredictionActions();
  }),
  getAnalyticsPredictionActionById: publicProcedure.input(analyticsPredictionActionIdSchema).query(async ({ input }) => {
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
