import {
  createGradeGrade,
  deleteGradeGrade,
  updateGradeGrade,
} from "../api/gradeGrades/mutations";
import { getGradeGradeById, getGradeGrades } from "../api/gradeGrades/queries";
import {
  gradeGradeIdSchema,
  insertGradeGradeParams,
  updateGradeGradeParams,
} from "../db/schema/gradeGrades";
import { publicProcedure, router } from "../server/trpc";

export const gradeGradesRouter = router({
  getGradeGrades: publicProcedure.query(async () => {
    return getGradeGrades();
  }),
  getGradeGradeById: publicProcedure
    .input(gradeGradeIdSchema)
    .query(async ({ input }) => {
      return getGradeGradeById(input.id);
    }),
  createGradeGrade: publicProcedure
    .input(insertGradeGradeParams)
    .mutation(async ({ input }) => {
      return createGradeGrade(input);
    }),
  updateGradeGrade: publicProcedure
    .input(updateGradeGradeParams)
    .mutation(async ({ input }) => {
      return updateGradeGrade(input.id, input);
    }),
  deleteGradeGrade: publicProcedure
    .input(gradeGradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeGrade(input.id);
    }),
});
