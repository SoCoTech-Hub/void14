import { getBackupCourseById, getBackupCourses } from "../api/backupCourses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  backupCourseIdSchema,
  insertBackupCourseParams,
  updateBackupCourseParams,
} from "@soco/backup-db/schema/backupCourses";
import { createBackupCourse, deleteBackupCourse, updateBackupCourse } from "../api/backupCourses/mutations";

export const backupCoursesRouter =createTRPCRouter({
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
