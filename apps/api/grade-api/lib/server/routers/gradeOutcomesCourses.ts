import {
  createGradeOutcomesCourse,
  deleteGradeOutcomesCourse,
  updateGradeOutcomesCourse,
} from "../api/gradeOutcomesCourses/mutations";
import {
  getGradeOutcomesCourseById,
  getGradeOutcomesCourses,
} from "../api/gradeOutcomesCourses/queries";
import {
  gradeOutcomesCourseIdSchema,
  insertGradeOutcomesCourseParams,
  updateGradeOutcomesCourseParams,
} from "../db/schema/gradeOutcomesCourses";
import { publicProcedure, router } from "../server/trpc";

export const gradeOutcomesCoursesRouter = router({
  getGradeOutcomesCourses: publicProcedure.query(async () => {
    return getGradeOutcomesCourses();
  }),
  getGradeOutcomesCourseById: publicProcedure
    .input(gradeOutcomesCourseIdSchema)
    .query(async ({ input }) => {
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
