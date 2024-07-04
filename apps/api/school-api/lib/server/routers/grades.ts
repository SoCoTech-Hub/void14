import { createGrade, deleteGrade, updateGrade } from "../api/grades/mutations";
import { getGradeById, getGrades } from "../api/grades/queries";
import {
  gradeIdSchema,
  insertGradeParams,
  updateGradeParams,
} from "../db/schema/grades";
import { publicProcedure, router } from "../server/trpc";

export const gradesRouter = router({
  getGrades: publicProcedure.query(async () => {
    return getGrades();
  }),
  getGradeById: publicProcedure
    .input(gradeIdSchema)
    .query(async ({ input }) => {
      return getGradeById(input.id);
    }),
  createGrade: publicProcedure
    .input(insertGradeParams)
    .mutation(async ({ input }) => {
      return createGrade(input);
    }),
  updateGrade: publicProcedure
    .input(updateGradeParams)
    .mutation(async ({ input }) => {
      return updateGrade(input.id, input);
    }),
  deleteGrade: publicProcedure
    .input(gradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteGrade(input.id);
    }),
});
