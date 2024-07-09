import {
  courseFormatOptionIdSchema,
  insertCourseFormatOptionParams,
  updateCourseFormatOptionParams,
} from "@soco/course-db/schema/courseFormatOptions";

import {
  createCourseFormatOption,
  deleteCourseFormatOption,
  updateCourseFormatOption,
} from "../api/courseFormatOptions/mutations";
import {
  getCourseFormatOptionById,
  getCourseFormatOptions,
} from "../api/courseFormatOptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const courseFormatOptionsRouter = createTRPCRouter({
  getCourseFormatOptions: publicProcedure.query(async () => {
    return getCourseFormatOptions();
  }),
  getCourseFormatOptionById: publicProcedure
    .input(courseFormatOptionIdSchema)
    .query(async ({ input }) => {
      return getCourseFormatOptionById(input.id);
    }),
  createCourseFormatOption: publicProcedure
    .input(insertCourseFormatOptionParams)
    .mutation(async ({ input }) => {
      return createCourseFormatOption(input);
    }),
  updateCourseFormatOption: publicProcedure
    .input(updateCourseFormatOptionParams)
    .mutation(async ({ input }) => {
      return updateCourseFormatOption(input.id, input);
    }),
  deleteCourseFormatOption: publicProcedure
    .input(courseFormatOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseFormatOption(input.id);
    }),
});
