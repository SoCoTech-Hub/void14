import {
  insertScaleHistoryParams,
  scaleHistoryIdSchema,
  updateScaleHistoryParams,
} from "@soco/scale-db/schema/scaleHistories";

import {
  createScaleHistory,
  deleteScaleHistory,
  updateScaleHistory,
} from "../api/scaleHistories/mutations";
import {
  getScaleHistories,
  getScaleHistoryById,
} from "../api/scaleHistories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scaleHistoriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getScaleHistories: publicProcedure.query(async () => {
      return getScaleHistories();
    }),
    getScaleHistoryById: publicProcedure
      .input(scaleHistoryIdSchema)
      .query(async ({ input }) => {
        return getScaleHistoryById(input.id);
      }),
    createScaleHistory: publicProcedure
      .input(insertScaleHistoryParams)
      .mutation(async ({ input }) => {
        return createScaleHistory(input);
      }),
    updateScaleHistory: publicProcedure
      .input(updateScaleHistoryParams)
      .mutation(async ({ input }) => {
        return updateScaleHistory(input.id, input);
      }),
    deleteScaleHistory: publicProcedure
      .input(scaleHistoryIdSchema)
      .mutation(async ({ input }) => {
        return deleteScaleHistory(input.id);
      }),
  });
