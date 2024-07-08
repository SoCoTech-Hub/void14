import { getGradeOutcomesCourseById, getGradeOutcomesCourses } from "../api/gradeOutcomesCourses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeOutcomesCourseIdSchema,
  insertGradeOutcomesCourseParams,
  updateGradeOutcomesCourseParams,
} from "@soco/grade-db/schema/gradeOutcomesCourses";
import { createGradeOutcomesCourse, deleteGradeOutcomesCourse, updateGradeOutcomesCourse } from "../api/gradeOutcomesCourses/mutations";

export const gradeOutcomesCoursesRouter =createTRPCRouter({
  getGradeOutcomesCourses: publicProcedure.query(async () => {
    return getGradeOutcomesCourses();
  }),
  getGradeOutcomesCourseById: publicProcedure.input(gradeOutcomesCourseIdSchema).query(async ({ input }) => {
    return getGradeOutcomesCourseById(input.id);
  }),
  createGradeOutcomesCourse: publicProcedure
    .input(insertGradeOutcomesCourseParams)
    .mutation(async ({ input }) => {
      return createGradeOutcomesCourse(input);
    }),
  updateGradeOutcomesCourse: publicProcedure
    .input(updateGradeOutcomesCourseParams)
    .mutation(async ({ input }) => {
      return updateGradeOutcomesCourse(input.id, input);
    }),
  deleteGradeOutcomesCourse: publicProcedure
    .input(gradeOutcomesCourseIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeOutcomesCourse(input.id);
    }),
});
