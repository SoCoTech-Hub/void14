import { getGradeOutcomesCourseById, getGradeOutcomesCourses } from "@/lib/api/gradeOutcomesCourses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeOutcomesCourseIdSchema,
  insertGradeOutcomesCourseParams,
  updateGradeOutcomesCourseParams,
} from "@/lib/db/schema/gradeOutcomesCourses";
import { createGradeOutcomesCourse, deleteGradeOutcomesCourse, updateGradeOutcomesCourse } from "@/lib/api/gradeOutcomesCourses/mutations";

export const gradeOutcomesCoursesRouter = router({
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
