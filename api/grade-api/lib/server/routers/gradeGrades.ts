import { getGradeGradeById, getGradeGrades } from "@/lib/api/gradeGrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeGradeIdSchema,
  insertGradeGradeParams,
  updateGradeGradeParams,
} from "@/lib/db/schema/gradeGrades";
import { createGradeGrade, deleteGradeGrade, updateGradeGrade } from "@/lib/api/gradeGrades/mutations";

export const gradeGradesRouter = router({
  getGradeGrades: publicProcedure.query(async () => {
    return getGradeGrades();
  }),
  getGradeGradeById: publicProcedure.input(gradeGradeIdSchema).query(async ({ input }) => {
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
