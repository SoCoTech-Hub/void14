import {
  createCourseCompletionAggrMethd,
  deleteCourseCompletionAggrMethd,
  updateCourseCompletionAggrMethd,
} from "../api/courseCompletionAggrMethds/mutations";
import {
  getCourseCompletionAggrMethdById,
  getCourseCompletionAggrMethds,
} from "../api/courseCompletionAggrMethds/queries";
import {
  courseCompletionAggrMethdIdSchema,
  insertCourseCompletionAggrMethdParams,
  updateCourseCompletionAggrMethdParams,
} from "../db/schema/courseCompletionAggrMethds";
import { publicProcedure, router } from "../server/trpc";

export const courseCompletionAggrMethdsRouter = router({
  getCourseCompletionAggrMethds: publicProcedure.query(async () => {
    return getCourseCompletionAggrMethds();
  }),
  getCourseCompletionAggrMethdById: publicProcedure
    .input(courseCompletionAggrMethdIdSchema)
    .query(async ({ input }) => {
      return getCourseCompletionAggrMethdById(input.id);
    }),
  createCourseCompletionAggrMethd: publicProcedure
    .input(insertCourseCompletionAggrMethdParams)
    .mutation(async ({ input }) => {
      return createCourseCompletionAggrMethd(input);
    }),
  updateCourseCompletionAggrMethd: publicProcedure
    .input(updateCourseCompletionAggrMethdParams)
    .mutation(async ({ input }) => {
      return updateCourseCompletionAggrMethd(input.id, input);
    }),
  deleteCourseCompletionAggrMethd: publicProcedure
    .input(courseCompletionAggrMethdIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseCompletionAggrMethd(input.id);
    }),
});
