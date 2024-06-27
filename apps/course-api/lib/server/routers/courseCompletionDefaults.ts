import { getCourseCompletionDefaultById, getCourseCompletionDefaults } from "@/lib/api/courseCompletionDefaults/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseCompletionDefaultIdSchema,
  insertCourseCompletionDefaultParams,
  updateCourseCompletionDefaultParams,
} from "@/lib/db/schema/courseCompletionDefaults";
import { createCourseCompletionDefault, deleteCourseCompletionDefault, updateCourseCompletionDefault } from "@/lib/api/courseCompletionDefaults/mutations";

export const courseCompletionDefaultsRouter = router({
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
