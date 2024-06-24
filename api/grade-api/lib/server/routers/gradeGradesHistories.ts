import { getGradeGradesHistoryById, getGradeGradesHistories } from "@/lib/api/gradeGradesHistories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeGradesHistoryIdSchema,
  insertGradeGradesHistoryParams,
  updateGradeGradesHistoryParams,
} from "@/lib/db/schema/gradeGradesHistories";
import { createGradeGradesHistory, deleteGradeGradesHistory, updateGradeGradesHistory } from "@/lib/api/gradeGradesHistories/mutations";

export const gradeGradesHistoriesRouter = router({
  getGradeGradesHistories: publicProcedure.query(async () => {
    return getGradeGradesHistories();
  }),
  getGradeGradesHistoryById: publicProcedure.input(gradeGradesHistoryIdSchema).query(async ({ input }) => {
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
