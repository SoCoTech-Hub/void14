import { getGradeById, getGrades } from "../api/grades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeIdSchema,
  insertGradeParams,
  updateGradeParams,
} from "@soco/school-db/schema/grades";
import { createGrade, deleteGrade, updateGrade } from "../api/grades/mutations";

export const gradesRouter =createTRPCRouter({
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
