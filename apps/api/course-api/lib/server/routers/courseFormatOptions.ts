import {
  createCourseFormatOption,
  deleteCourseFormatOption,
  updateCourseFormatOption,
} from "../api/courseFormatOptions/mutations";
import {
  getCourseFormatOptionById,
  getCourseFormatOptions,
} from "../api/courseFormatOptions/queries";
import {
  courseFormatOptionIdSchema,
  insertCourseFormatOptionParams,
  updateCourseFormatOptionParams,
} from "../db/schema/courseFormatOptions";
import { publicProcedure, router } from "../server/trpc";

export const courseFormatOptionsRouter = router({
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
