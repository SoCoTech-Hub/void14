import { getBackupCourseById, getBackupCourses } from "@/lib/api/backupCourses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  backupCourseIdSchema,
  insertBackupCourseParams,
  updateBackupCourseParams,
} from "@/lib/db/schema/backupCourses";
import { createBackupCourse, deleteBackupCourse, updateBackupCourse } from "@/lib/api/backupCourses/mutations";

export const backupCoursesRouter = router({
  getBackupCourses: publicProcedure.query(async () => {
    return getBackupCourses();
  }),
  getBackupCourseById: publicProcedure.input(backupCourseIdSchema).query(async ({ input }) => {
    return getBackupCourseById(input.id);
  }),
  createBackupCourse: publicProcedure
    .input(insertBackupCourseParams)
    .mutation(async ({ input }) => {
      return createBackupCourse(input);
    }),
  updateBackupCourse: publicProcedure
    .input(updateBackupCourseParams)
    .mutation(async ({ input }) => {
      return updateBackupCourse(input.id, input);
    }),
  deleteBackupCourse: publicProcedure
    .input(backupCourseIdSchema)
    .mutation(async ({ input }) => {
      return deleteBackupCourse(input.id);
    }),
});
