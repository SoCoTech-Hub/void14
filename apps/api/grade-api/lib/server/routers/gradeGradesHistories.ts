import {
  createGradeGradesHistory,
  deleteGradeGradesHistory,
  updateGradeGradesHistory,
} from "../api/gradeGradesHistories/mutations";
import {
  getGradeGradesHistories,
  getGradeGradesHistoryById,
} from "../api/gradeGradesHistories/queries";
import {
  gradeGradesHistoryIdSchema,
  insertGradeGradesHistoryParams,
  updateGradeGradesHistoryParams,
} from "../db/schema/gradeGradesHistories";
import { publicProcedure, router } from "../server/trpc";

export const gradeGradesHistoriesRouter = router({
  getGradeGradesHistories: publicProcedure.query(async () => {
    return getGradeGradesHistories();
  }),
  getGradeGradesHistoryById: publicProcedure
    .input(gradeGradesHistoryIdSchema)
    .query(async ({ input }) => {
      return getGradeGradesHistoryById(input.id);
    }),
  createGradeGradesHistory: publicProcedure
    .input(insertGradeGradesHistoryParams)
    .mutation(async ({ input }) => {
      return createGradeGradesHistory(input);
    }),
  updateGradeGradesHistory: publicProcedure
    .input(updateGradeGradesHistoryParams)
    .mutation(async ({ input }) => {
      return updateGradeGradesHistory(input.id, input);
    }),
  deleteGradeGradesHistory: publicProcedure
    .input(gradeGradesHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeGradesHistory(input.id);
    }),
});
