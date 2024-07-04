import {
  createCourseCompletionDefault,
  deleteCourseCompletionDefault,
  updateCourseCompletionDefault,
} from "../api/courseCompletionDefaults/mutations";
import {
  getCourseCompletionDefaultById,
  getCourseCompletionDefaults,
} from "../api/courseCompletionDefaults/queries";
import {
  courseCompletionDefaultIdSchema,
  insertCourseCompletionDefaultParams,
  updateCourseCompletionDefaultParams,
} from "../db/schema/courseCompletionDefaults";
import { publicProcedure, router } from "../server/trpc";

export const courseCompletionDefaultsRouter = router({
  getCourseCompletionDefaults: publicProcedure.query(async () => {
    return getCourseCompletionDefaults();
  }),
  getCourseCompletionDefaultById: publicProcedure
    .input(courseCompletionDefaultIdSchema)
    .query(async ({ input }) => {
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
