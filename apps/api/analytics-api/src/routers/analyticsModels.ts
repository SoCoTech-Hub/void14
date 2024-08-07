import {
  analyticsModelIdSchema,
  insertAnalyticsModelParams,
  updateAnalyticsModelParams,
} from "@soco/analytics-db/schema/analyticsModels";

import {
  createAnalyticsModel,
  deleteAnalyticsModel,
  updateAnalyticsModel,
} from "../api/analyticsModels/mutations";
import {
  getAnalyticsModelById,
  getAnalyticsModels,
} from "../api/analyticsModels/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsModelsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAnalyticsModels: publicProcedure.query(async () => {
      return getAnalyticsModels();
    }),
    getAnalyticsModelById: publicProcedure
      .input(analyticsModelIdSchema)
      .query(async ({ input }) => {
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
