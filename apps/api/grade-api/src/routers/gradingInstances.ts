import {
  gradingInstanceIdSchema,
  insertGradingInstanceParams,
  updateGradingInstanceParams,
} from "@soco/grade-db/schema/gradingInstances";

import {
  createGradingInstance,
  deleteGradingInstance,
  updateGradingInstance,
} from "../api/gradingInstances/mutations";
import {
  getGradingInstanceById,
  getGradingInstances,
} from "../api/gradingInstances/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradingInstancesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradingInstances: publicProcedure.query(async () => {
      return getGradingInstances();
    }),
    getGradingInstanceById: publicProcedure
      .input(gradingInstanceIdSchema)
      .query(async ({ input }) => {
        return getGradingInstanceById(input.id);
      }),
    createGradingInstance: publicProcedure
      .input(insertGradingInstanceParams)
      .mutation(async ({ input }) => {
        return createGradingInstance(input);
      }),
    updateGradingInstance: publicProcedure
      .input(updateGradingInstanceParams)
      .mutation(async ({ input }) => {
        return updateGradingInstance(input.id, input);
      }),
    deleteGradingInstance: publicProcedure
      .input(gradingInstanceIdSchema)
      .mutation(async ({ input }) => {
        return deleteGradingInstance(input.id);
      }),
  });
