import { getMnetServiceEnrolCourseById, getMnetServiceEnrolCourses } from "../api/mnetServiceEnrolCourses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  mnetServiceEnrolCourseIdSchema,
  insertMnetServiceEnrolCourseParams,
  updateMnetServiceEnrolCourseParams,
} from "@soco/mnet-db/schema/mnetServiceEnrolCourses";
import { createMnetServiceEnrolCourse, deleteMnetServiceEnrolCourse, updateMnetServiceEnrolCourse } from "../api/mnetServiceEnrolCourses/mutations";

export const mnetServiceEnrolCoursesRouter =createTRPCRouter({
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
