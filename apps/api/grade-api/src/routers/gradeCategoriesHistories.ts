import {
  gradeCategoriesHistoryIdSchema,
  insertGradeCategoriesHistoryParams,
  updateGradeCategoriesHistoryParams,
} from "@soco/grade-db/schema/gradeCategoriesHistories";

import {
  createGradeCategoriesHistory,
  deleteGradeCategoriesHistory,
  updateGradeCategoriesHistory,
} from "../api/gradeCategoriesHistories/mutations";
import {
  getGradeCategoriesHistories,
  getGradeCategoriesHistoryById,
} from "../api/gradeCategoriesHistories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeCategoriesHistoriesRouter = createTRPCRouter({
  getGradeCategoriesHistories: publicProcedure.query(async () => {
    return getGradeCategoriesHistories();
  }),
  getGradeCategoriesHistoryById: publicProcedure
    .input(gradeCategoriesHistoryIdSchema)
    .query(async ({ input }) => {
      return getGradeCategoriesHistoryById(input.id);
    }),
  createGradeCategoriesHistory: publicProcedure
    .input(insertGradeCategoriesHistoryParams)
    .mutation(async ({ input }) => {
      return createGradeCategoriesHistory(input);
    }),
  updateGradeCategoriesHistory: publicProcedure
    .input(updateGradeCategoriesHistoryParams)
    .mutation(async ({ input }) => {
      return updateGradeCategoriesHistory(input.id, input);
    }),
  deleteGradeCategoriesHistory: publicProcedure
    .input(gradeCategoriesHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeCategoriesHistory(input.id);
    }),
});
