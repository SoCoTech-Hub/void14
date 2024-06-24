import { getAnalyticsModelById, getAnalyticsModels } from "@/lib/api/analyticsModels/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  analyticsModelIdSchema,
  insertAnalyticsModelParams,
  updateAnalyticsModelParams,
} from "@/lib/db/schema/analyticsModels";
import { createAnalyticsModel, deleteAnalyticsModel, updateAnalyticsModel } from "@/lib/api/analyticsModels/mutations";

export const analyticsModelsRouter = router({
  getAnalyticsModels: publicProcedure.query(async () => {
    return getAnalyticsModels();
  }),
  getAnalyticsModelById: publicProcedure.input(analyticsModelIdSchema).query(async ({ input }) => {
    return getAnalyticsModelById(input.id);
  }),
  createAnalyticsModel: publicProcedure
    .input(insertAnalyticsModelParams)
    .mutation(async ({ input }) => {
      return createAnalyticsModel(input);
    }),
  updateAnalyticsModel: publicProcedure
    .input(updateAnalyticsModelParams)
    .mutation(async ({ input }) => {
      return updateAnalyticsModel(input.id, input);
    }),
  deleteAnalyticsModel: publicProcedure
    .input(analyticsModelIdSchema)
    .mutation(async ({ input }) => {
      return deleteAnalyticsModel(input.id);
    }),
});
