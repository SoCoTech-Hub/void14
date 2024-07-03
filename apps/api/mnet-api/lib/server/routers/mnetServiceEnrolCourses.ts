import { getMnetServiceEnrolCourseById, getMnetServiceEnrolCourses } from "@/lib/api/mnetServiceEnrolCourses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetServiceEnrolCourseIdSchema,
  insertMnetServiceEnrolCourseParams,
  updateMnetServiceEnrolCourseParams,
} from "@/lib/db/schema/mnetServiceEnrolCourses";
import { createMnetServiceEnrolCourse, deleteMnetServiceEnrolCourse, updateMnetServiceEnrolCourse } from "@/lib/api/mnetServiceEnrolCourses/mutations";

export const mnetServiceEnrolCoursesRouter = router({
  getMnetServiceEnrolCourses: publicProcedure.query(async () => {
    return getMnetServiceEnrolCourses();
  }),
  getMnetServiceEnrolCourseById: publicProcedure.input(mnetServiceEnrolCourseIdSchema).query(async ({ input }) => {
    return getMnetServiceEnrolCourseById(input.id);
  }),
  createMnetServiceEnrolCourse: publicProcedure
    .input(insertMnetServiceEnrolCourseParams)
    .mutation(async ({ input }) => {
      return createMnetServiceEnrolCourse(input);
    }),
  updateMnetServiceEnrolCourse: publicProcedure
    .input(updateMnetServiceEnrolCourseParams)
    .mutation(async ({ input }) => {
      return updateMnetServiceEnrolCourse(input.id, input);
    }),
  deleteMnetServiceEnrolCourse: publicProcedure
    .input(mnetServiceEnrolCourseIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetServiceEnrolCourse(input.id);
    }),
});
