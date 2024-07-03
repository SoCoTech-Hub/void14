import { getCourseModulesCompletionById, getCourseModulesCompletions } from "@/lib/api/courseModulesCompletions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseModulesCompletionIdSchema,
  insertCourseModulesCompletionParams,
  updateCourseModulesCompletionParams,
} from "@/lib/db/schema/courseModulesCompletions";
import { createCourseModulesCompletion, deleteCourseModulesCompletion, updateCourseModulesCompletion } from "@/lib/api/courseModulesCompletions/mutations";

export const courseModulesCompletionsRouter = router({
  getCourseModulesCompletions: publicProcedure.query(async () => {
    return getCourseModulesCompletions();
  }),
  getCourseModulesCompletionById: publicProcedure.input(courseModulesCompletionIdSchema).query(async ({ input }) => {
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
