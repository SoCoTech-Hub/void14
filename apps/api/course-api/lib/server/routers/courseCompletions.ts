import {
  createCourseCompletion,
  deleteCourseCompletion,
  updateCourseCompletion,
} from "../api/courseCompletions/mutations";
import {
  getCourseCompletionById,
  getCourseCompletions,
} from "../api/courseCompletions/queries";
import {
  courseCompletionIdSchema,
  insertCourseCompletionParams,
  updateCourseCompletionParams,
} from "../db/schema/courseCompletions";
import { publicProcedure, router } from "../server/trpc";

export const courseCompletionsRouter = router({
  getCourseCompletions: publicProcedure.query(async () => {
    return getCourseCompletions();
  }),
  getCourseCompletionById: publicProcedure
    .input(courseCompletionIdSchema)
    .query(async ({ input }) => {
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
