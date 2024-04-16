import { getGradeById, getGrades } from "@/lib/api/grades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeIdSchema,
  insertGradeParams,
  updateGradeParams,
} from "@/lib/db/schema/grades";
import { createGrade, deleteGrade, updateGrade } from "@/lib/api/grades/mutations";

export const gradesRouter = router({
  getGrades: publicProcedure.query(async () => {
    return getGrades();
  }),
  getGradeById: publicProcedure.input(gradeIdSchema).query(async ({ input }) => {
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
