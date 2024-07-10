import { getCourseCompletionDefaultById, getCourseCompletionDefaults } from "../api/courseCompletionDefaults/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  courseCompletionDefaultIdSchema,
  insertCourseCompletionDefaultParams,
  updateCourseCompletionDefaultParams,
} from "@soco/course-db/schema/courseCompletionDefaults";
import { createCourseCompletionDefault, deleteCourseCompletionDefault, updateCourseCompletionDefault } from "../api/courseCompletionDefaults/mutations";

export const courseCompletionDefaultsRouter =createTRPCRouter({
  getCourseCompletionDefaults: publicProcedure.query(async () => {
    return getCourseCompletionDefaults();
  }),
  getCourseCompletionDefaultById: publicProcedure.input(courseCompletionDefaultIdSchema).query(async ({ input }) => {
    return getCourseCompletionDefaultById(input.id);
  }),
  createCourseCompletionDefault: publicProcedure
    .input(insertCourseCompletionDefaultParams)
    .mutation(async ({ input }) => {
      return createCourseCompletionDefault(input);
    }),
  updateCourseCompletionDefault: publicProcedure
    .input(updateCourseCompletionDefaultParams)
    .mutation(async ({ input }) => {
      return updateCourseCompletionDefault(input.id, input);
    }),
  deleteCourseCompletionDefault: publicProcedure
    .input(courseCompletionDefaultIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseCompletionDefault(input.id);
    }),
});
