import {
  createMnetServiceEnrolCourse,
  deleteMnetServiceEnrolCourse,
  updateMnetServiceEnrolCourse,
} from "../api/mnetServiceEnrolCourses/mutations";
import {
  getMnetServiceEnrolCourseById,
  getMnetServiceEnrolCourses,
} from "../api/mnetServiceEnrolCourses/queries";
import {
  insertMnetServiceEnrolCourseParams,
  mnetServiceEnrolCourseIdSchema,
  updateMnetServiceEnrolCourseParams,
} from "../db/schema/mnetServiceEnrolCourses";
import { publicProcedure, router } from "../server/trpc";

export const mnetServiceEnrolCoursesRouter = router({
  getMnetServiceEnrolCourses: publicProcedure.query(async () => {
    return getMnetServiceEnrolCourses();
  }),
  getMnetServiceEnrolCourseById: publicProcedure
    .input(mnetServiceEnrolCourseIdSchema)
    .query(async ({ input }) => {
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
