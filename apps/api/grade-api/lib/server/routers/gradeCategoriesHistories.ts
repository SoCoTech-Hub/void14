import { getGradeCategoriesHistoryById, getGradeCategoriesHistories } from "@/lib/api/gradeCategoriesHistories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeCategoriesHistoryIdSchema,
  insertGradeCategoriesHistoryParams,
  updateGradeCategoriesHistoryParams,
} from "@/lib/db/schema/gradeCategoriesHistories";
import { createGradeCategoriesHistory, deleteGradeCategoriesHistory, updateGradeCategoriesHistory } from "@/lib/api/gradeCategoriesHistories/mutations";

export const gradeCategoriesHistoriesRouter = router({
  getGradeCategoriesHistories: publicProcedure.query(async () => {
    return getGradeCategoriesHistories();
  }),
  getGradeCategoriesHistoryById: publicProcedure.input(gradeCategoriesHistoryIdSchema).query(async ({ input }) => {
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
