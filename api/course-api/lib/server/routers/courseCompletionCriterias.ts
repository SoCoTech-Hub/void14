import { getCourseCompletionCriteriaById, getCourseCompletionCriterias } from "@/lib/api/courseCompletionCriterias/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseCompletionCriteriaIdSchema,
  insertCourseCompletionCriteriaParams,
  updateCourseCompletionCriteriaParams,
} from "@/lib/db/schema/courseCompletionCriterias";
import { createCourseCompletionCriteria, deleteCourseCompletionCriteria, updateCourseCompletionCriteria } from "@/lib/api/courseCompletionCriterias/mutations";

export const courseCompletionCriteriasRouter = router({
  getCourseCompletionCriterias: publicProcedure.query(async () => {
    return getCourseCompletionCriterias();
  }),
  getCourseCompletionCriteriaById: publicProcedure.input(courseCompletionCriteriaIdSchema).query(async ({ input }) => {
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
