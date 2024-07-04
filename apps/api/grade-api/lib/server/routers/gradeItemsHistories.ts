import {
  createGradeItemsHistory,
  deleteGradeItemsHistory,
  updateGradeItemsHistory,
} from "../api/gradeItemsHistories/mutations";
import {
  getGradeItemsHistories,
  getGradeItemsHistoryById,
} from "../api/gradeItemsHistories/queries";
import {
  gradeItemsHistoryIdSchema,
  insertGradeItemsHistoryParams,
  updateGradeItemsHistoryParams,
} from "../db/schema/gradeItemsHistories";
import { publicProcedure, router } from "../server/trpc";

export const gradeItemsHistoriesRouter = router({
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
