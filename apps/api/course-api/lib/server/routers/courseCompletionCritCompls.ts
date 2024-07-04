import {
  createCourseCompletionCritCompl,
  deleteCourseCompletionCritCompl,
  updateCourseCompletionCritCompl,
} from "../api/courseCompletionCritCompls/mutations";
import {
  getCourseCompletionCritComplById,
  getCourseCompletionCritCompls,
} from "../api/courseCompletionCritCompls/queries";
import {
  courseCompletionCritComplIdSchema,
  insertCourseCompletionCritComplParams,
  updateCourseCompletionCritComplParams,
} from "../db/schema/courseCompletionCritCompls";
import { publicProcedure, router } from "../server/trpc";

export const courseCompletionCritComplsRouter = router({
  getCourseCompletionCritCompls: publicProcedure.query(async () => {
    return getCourseCompletionCritCompls();
  }),
  getCourseCompletionCritComplById: publicProcedure
    .input(courseCompletionCritComplIdSchema)
    .query(async ({ input }) => {
      return getCourseCompletionCritComplById(input.id);
    }),
  createCourseCompletionCritCompl: publicProcedure
    .input(insertCourseCompletionCritComplParams)
    .mutation(async ({ input }) => {
      return createCourseCompletionCritCompl(input);
    }),
  updateCourseCompletionCritCompl: publicProcedure
    .input(updateCourseCompletionCritComplParams)
    .mutation(async ({ input }) => {
      return updateCourseCompletionCritCompl(input.id, input);
    }),
  deleteCourseCompletionCritCompl: publicProcedure
    .input(courseCompletionCritComplIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseCompletionCritCompl(input.id);
    }),
});
