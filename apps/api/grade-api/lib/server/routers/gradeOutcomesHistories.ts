import {
  createGradeOutcomesHistory,
  deleteGradeOutcomesHistory,
  updateGradeOutcomesHistory,
} from "../api/gradeOutcomesHistories/mutations";
import {
  getGradeOutcomesHistories,
  getGradeOutcomesHistoryById,
} from "../api/gradeOutcomesHistories/queries";
import {
  gradeOutcomesHistoryIdSchema,
  insertGradeOutcomesHistoryParams,
  updateGradeOutcomesHistoryParams,
} from "../db/schema/gradeOutcomesHistories";
import { publicProcedure, router } from "../server/trpc";

export const gradeOutcomesHistoriesRouter = router({
  getGradeOutcomesHistories: publicProcedure.query(async () => {
    return getGradeOutcomesHistories();
  }),
  getGradeOutcomesHistoryById: publicProcedure
    .input(gradeOutcomesHistoryIdSchema)
    .query(async ({ input }) => {
      return getGradeOutcomesHistoryById(input.id);
    }),
  createGradeOutcomesHistory: publicProcedure
    .input(insertGradeOutcomesHistoryParams)
    .mutation(async ({ input }) => {
      return createGradeOutcomesHistory(input);
    }),
  updateGradeOutcomesHistory: publicProcedure
    .input(updateGradeOutcomesHistoryParams)
    .mutation(async ({ input }) => {
      return updateGradeOutcomesHistory(input.id, input);
    }),
  deleteGradeOutcomesHistory: publicProcedure
    .input(gradeOutcomesHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeOutcomesHistory(input.id);
    }),
});
