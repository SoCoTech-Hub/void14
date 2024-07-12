import {
  courseCompletionAggrMethdIdSchema,
  insertCourseCompletionAggrMethdParams,
  updateCourseCompletionAggrMethdParams,
} from "@soco/course-db/schema/courseCompletionAggrMethds";

import {
  createCourseCompletionAggrMethd,
  deleteCourseCompletionAggrMethd,
  updateCourseCompletionAggrMethd,
} from "../api/courseCompletionAggrMethds/mutations";
import {
  getCourseCompletionAggrMethdById,
  getCourseCompletionAggrMethds,
} from "../api/courseCompletionAggrMethds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const courseCompletionAggrMethdsRouter = createTRPCRouter({
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
