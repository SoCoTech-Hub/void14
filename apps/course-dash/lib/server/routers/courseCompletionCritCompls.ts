import { getCourseCompletionCritComplById, getCourseCompletionCritCompls } from "@/lib/api/courseCompletionCritCompls/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseCompletionCritComplIdSchema,
  insertCourseCompletionCritComplParams,
  updateCourseCompletionCritComplParams,
} from "@/lib/db/schema/courseCompletionCritCompls";
import { createCourseCompletionCritCompl, deleteCourseCompletionCritCompl, updateCourseCompletionCritCompl } from "@/lib/api/courseCompletionCritCompls/mutations";

export const courseCompletionCritComplsRouter = router({
  getCourseCompletionCritCompls: publicProcedure.query(async () => {
    return getCourseCompletionCritCompls();
  }),
  getCourseCompletionCritComplById: publicProcedure.input(courseCompletionCritComplIdSchema).query(async ({ input }) => {
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
