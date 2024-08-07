import {
  courseIdSchema,
  insertCourseParams,
  updateCourseParams,
} from "@soco/course-db/schema/courses";

import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "../api/courses/mutations";
import { getCourseById, getCourses } from "../api/courses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const coursesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCourses: publicProcedure.query(async () => {
      return getCourses();
    }),
    getCourseById: publicProcedure
      .input(courseIdSchema)
      .query(async ({ input }) => {
        return getCourseById(input.id);
      }),
    createCourse: publicProcedure
      .input(insertCourseParams)
      .mutation(async ({ input }) => {
        return createCourse(input);
      }),
    updateCourse: publicProcedure
      .input(updateCourseParams)
      .mutation(async ({ input }) => {
        return updateCourse(input.id, input);
      }),
    deleteCourse: publicProcedure
      .input(courseIdSchema)
      .mutation(async ({ input }) => {
        return deleteCourse(input.id);
      }),
  });
