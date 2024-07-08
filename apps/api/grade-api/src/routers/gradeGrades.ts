import { getGradeGradeById, getGradeGrades } from "../api/gradeGrades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeGradeIdSchema,
  insertGradeGradeParams,
  updateGradeGradeParams,
} from "@soco/grade-db/schema/gradeGrades";
import { createGradeGrade, deleteGradeGrade, updateGradeGrade } from "../api/gradeGrades/mutations";

export const gradeGradesRouter =createTRPCRouter({
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
