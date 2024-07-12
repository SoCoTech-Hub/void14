import {
  gradeGradesHistoryIdSchema,
  insertGradeGradesHistoryParams,
  updateGradeGradesHistoryParams,
} from "@soco/grade-db/schema/gradeGradesHistories";

import {
  createGradeGradesHistory,
  deleteGradeGradesHistory,
  updateGradeGradesHistory,
} from "../api/gradeGradesHistories/mutations";
import {
  getGradeGradesHistories,
  getGradeGradesHistoryById,
} from "../api/gradeGradesHistories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeGradesHistoriesRouter = createTRPCRouter({
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
