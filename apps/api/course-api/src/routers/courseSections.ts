import {
  courseSectionIdSchema,
  insertCourseSectionParams,
  updateCourseSectionParams,
} from "@soco/course-db/schema/courseSections";

import {
  createCourseSection,
  deleteCourseSection,
  updateCourseSection,
} from "../api/courseSections/mutations";
import {
  getCourseSectionById,
  getCourseSections,
} from "../api/courseSections/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const courseSectionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCourseSections: publicProcedure.query(async () => {
      return getCourseSections();
    }),
    getCourseSectionById: publicProcedure
      .input(courseSectionIdSchema)
      .query(async ({ input }) => {
        return getCourseSectionById(input.id);
      }),
    createCourseSection: publicProcedure
      .input(insertCourseSectionParams)
      .mutation(async ({ input }) => {
        return createCourseSection(input);
      }),
    updateCourseSection: publicProcedure
      .input(updateCourseSectionParams)
      .mutation(async ({ input }) => {
        return updateCourseSection(input.id, input);
      }),
    deleteCourseSection: publicProcedure
      .input(courseSectionIdSchema)
      .mutation(async ({ input }) => {
        return deleteCourseSection(input.id);
      }),
  });
