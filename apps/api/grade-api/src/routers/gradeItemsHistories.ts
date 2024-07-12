import {
  gradeItemsHistoryIdSchema,
  insertGradeItemsHistoryParams,
  updateGradeItemsHistoryParams,
} from "@soco/grade-db/schema/gradeItemsHistories";

import {
  createGradeItemsHistory,
  deleteGradeItemsHistory,
  updateGradeItemsHistory,
} from "../api/gradeItemsHistories/mutations";
import {
  getGradeItemsHistories,
  getGradeItemsHistoryById,
} from "../api/gradeItemsHistories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeItemsHistoriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradeItemsHistories: publicProcedure.query(async () => {
      return getGradeItemsHistories();
    }),
    getGradeItemsHistoryById: publicProcedure
      .input(gradeItemsHistoryIdSchema)
      .query(async ({ input }) => {
        return getGradeItemsHistoryById(input.id);
      }),
    createGradeItemsHistory: publicProcedure
      .input(insertGradeItemsHistoryParams)
      .mutation(async ({ input }) => {
        return createGradeItemsHistory(input);
      }),
    updateGradeItemsHistory: publicProcedure
      .input(updateGradeItemsHistoryParams)
      .mutation(async ({ input }) => {
        return updateGradeItemsHistory(input.id, input);
      }),
    deleteGradeItemsHistory: publicProcedure
      .input(gradeItemsHistoryIdSchema)
      .mutation(async ({ input }) => {
        return deleteGradeItemsHistory(input.id);
      }),
  });
