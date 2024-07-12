import {
  courseModulesCompletionIdSchema,
  insertCourseModulesCompletionParams,
  updateCourseModulesCompletionParams,
} from "@soco/course-db/schema/courseModulesCompletions";

import {
  createCourseModulesCompletion,
  deleteCourseModulesCompletion,
  updateCourseModulesCompletion,
} from "../api/courseModulesCompletions/mutations";
import {
  getCourseModulesCompletionById,
  getCourseModulesCompletions,
} from "../api/courseModulesCompletions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const courseModulesCompletionsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
