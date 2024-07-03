import { getCourseCompletionById, getCourseCompletions } from "@/lib/api/courseCompletions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseCompletionIdSchema,
  insertCourseCompletionParams,
  updateCourseCompletionParams,
} from "@/lib/db/schema/courseCompletions";
import { createCourseCompletion, deleteCourseCompletion, updateCourseCompletion } from "@/lib/api/courseCompletions/mutations";

export const courseCompletionsRouter = router({
  getCourseCompletions: publicProcedure.query(async () => {
    return getCourseCompletions();
  }),
  getCourseCompletionById: publicProcedure.input(courseCompletionIdSchema).query(async ({ input }) => {
    return getCourseCompletionById(input.id);
  }),
  createCourseCompletion: publicProcedure
    .input(insertCourseCompletionParams)
    .mutation(async ({ input }) => {
      return createCourseCompletion(input);
    }),
  updateCourseCompletion: publicProcedure
    .input(updateCourseCompletionParams)
    .mutation(async ({ input }) => {
      return updateCourseCompletion(input.id, input);
    }),
  deleteCourseCompletion: publicProcedure
    .input(courseCompletionIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseCompletion(input.id);
    }),
});
