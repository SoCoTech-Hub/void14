import {
  createCourseModulesCompletion,
  deleteCourseModulesCompletion,
  updateCourseModulesCompletion,
} from "../api/courseModulesCompletions/mutations";
import {
  getCourseModulesCompletionById,
  getCourseModulesCompletions,
} from "../api/courseModulesCompletions/queries";
import {
  courseModulesCompletionIdSchema,
  insertCourseModulesCompletionParams,
  updateCourseModulesCompletionParams,
} from "../db/schema/courseModulesCompletions";
import { publicProcedure, router } from "../server/trpc";

export const courseModulesCompletionsRouter = router({
  getCourseModulesCompletions: publicProcedure.query(async () => {
    return getCourseModulesCompletions();
  }),
  getCourseModulesCompletionById: publicProcedure
    .input(courseModulesCompletionIdSchema)
    .query(async ({ input }) => {
      return getCourseModulesCompletionById(input.id);
    }),
  createCourseModulesCompletion: publicProcedure
    .input(insertCourseModulesCompletionParams)
    .mutation(async ({ input }) => {
      return createCourseModulesCompletion(input);
    }),
  updateCourseModulesCompletion: publicProcedure
    .input(updateCourseModulesCompletionParams)
    .mutation(async ({ input }) => {
      return updateCourseModulesCompletion(input.id, input);
    }),
  deleteCourseModulesCompletion: publicProcedure
    .input(courseModulesCompletionIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseModulesCompletion(input.id);
    }),
});
