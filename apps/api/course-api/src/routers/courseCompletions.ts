import { getCourseCompletionById, getCourseCompletions } from "../api/courseCompletions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  courseCompletionIdSchema,
  insertCourseCompletionParams,
  updateCourseCompletionParams,
} from "@soco/course-db/schema/courseCompletions";
import { createCourseCompletion, deleteCourseCompletion, updateCourseCompletion } from "../api/courseCompletions/mutations";

export const courseCompletionsRouter =createTRPCRouter({
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
