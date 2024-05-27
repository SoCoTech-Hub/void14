import { getCourseCompletionAggrMethdById, getCourseCompletionAggrMethds } from "@/lib/api/courseCompletionAggrMethds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseCompletionAggrMethdIdSchema,
  insertCourseCompletionAggrMethdParams,
  updateCourseCompletionAggrMethdParams,
} from "@/lib/db/schema/courseCompletionAggrMethds";
import { createCourseCompletionAggrMethd, deleteCourseCompletionAggrMethd, updateCourseCompletionAggrMethd } from "@/lib/api/courseCompletionAggrMethds/mutations";

export const courseCompletionAggrMethdsRouter = router({
  getCourseCompletionAggrMethds: publicProcedure.query(async () => {
    return getCourseCompletionAggrMethds();
  }),
  getCourseCompletionAggrMethdById: publicProcedure.input(courseCompletionAggrMethdIdSchema).query(async ({ input }) => {
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
