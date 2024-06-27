import { getCourseFormatOptionById, getCourseFormatOptions } from "@/lib/api/courseFormatOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseFormatOptionIdSchema,
  insertCourseFormatOptionParams,
  updateCourseFormatOptionParams,
} from "@/lib/db/schema/courseFormatOptions";
import { createCourseFormatOption, deleteCourseFormatOption, updateCourseFormatOption } from "@/lib/api/courseFormatOptions/mutations";

export const courseFormatOptionsRouter = router({
  getCourseFormatOptions: publicProcedure.query(async () => {
    return getCourseFormatOptions();
  }),
  getCourseFormatOptionById: publicProcedure.input(courseFormatOptionIdSchema).query(async ({ input }) => {
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
