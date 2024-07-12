import {
  gradingAreaIdSchema,
  insertGradingAreaParams,
  updateGradingAreaParams,
} from "@soco/grade-db/schema/gradingAreas";

import {
  createGradingArea,
  deleteGradingArea,
  updateGradingArea,
} from "../api/gradingAreas/mutations";
import {
  getGradingAreaById,
  getGradingAreas,
} from "../api/gradingAreas/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradingAreasRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradingAreas: publicProcedure.query(async () => {
      return getGradingAreas();
    }),
    getGradingAreaById: publicProcedure
      .input(gradingAreaIdSchema)
      .query(async ({ input }) => {
        return getGradingAreaById(input.id);
      }),
    createGradingArea: publicProcedure
      .input(insertGradingAreaParams)
      .mutation(async ({ input }) => {
        return createGradingArea(input);
      }),
    updateGradingArea: publicProcedure
      .input(updateGradingAreaParams)
      .mutation(async ({ input }) => {
        return updateGradingArea(input.id, input);
      }),
    deleteGradingArea: publicProcedure
      .input(gradingAreaIdSchema)
      .mutation(async ({ input }) => {
        return deleteGradingArea(input.id);
      }),
  });
