import {
  createCourseCompletionCriteria,
  deleteCourseCompletionCriteria,
  updateCourseCompletionCriteria,
} from "../api/courseCompletionCriterias/mutations";
import {
  getCourseCompletionCriteriaById,
  getCourseCompletionCriterias,
} from "../api/courseCompletionCriterias/queries";
import {
  courseCompletionCriteriaIdSchema,
  insertCourseCompletionCriteriaParams,
  updateCourseCompletionCriteriaParams,
} from "../db/schema/courseCompletionCriterias";
import { publicProcedure, router } from "../server/trpc";

export const courseCompletionCriteriasRouter = router({
  getCourseCompletionCriterias: publicProcedure.query(async () => {
    return getCourseCompletionCriterias();
  }),
  getCourseCompletionCriteriaById: publicProcedure
    .input(courseCompletionCriteriaIdSchema)
    .query(async ({ input }) => {
      return getCourseCompletionCriteriaById(input.id);
    }),
  createCourseCompletionCriteria: publicProcedure
    .input(insertCourseCompletionCriteriaParams)
    .mutation(async ({ input }) => {
      return createCourseCompletionCriteria(input);
    }),
  updateCourseCompletionCriteria: publicProcedure
    .input(updateCourseCompletionCriteriaParams)
    .mutation(async ({ input }) => {
      return updateCourseCompletionCriteria(input.id, input);
    }),
  deleteCourseCompletionCriteria: publicProcedure
    .input(courseCompletionCriteriaIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseCompletionCriteria(input.id);
    }),
});