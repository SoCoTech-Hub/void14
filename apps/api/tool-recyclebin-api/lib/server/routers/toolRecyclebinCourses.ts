import { getToolRecyclebinCourseById, getToolRecyclebinCourses } from "@/lib/api/toolRecyclebinCourses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolRecyclebinCourseIdSchema,
  insertToolRecyclebinCourseParams,
  updateToolRecyclebinCourseParams,
} from "@/lib/db/schema/toolRecyclebinCourses";
import { createToolRecyclebinCourse, deleteToolRecyclebinCourse, updateToolRecyclebinCourse } from "@/lib/api/toolRecyclebinCourses/mutations";

export const toolRecyclebinCoursesRouter = router({
  getToolRecyclebinCourses: publicProcedure.query(async () => {
    return getToolRecyclebinCourses();
  }),
  getToolRecyclebinCourseById: publicProcedure.input(toolRecyclebinCourseIdSchema).query(async ({ input }) => {
    return getToolRecyclebinCourseById(input.id);
  }),
  createToolRecyclebinCourse: publicProcedure
    .input(insertToolRecyclebinCourseParams)
    .mutation(async ({ input }) => {
      return createToolRecyclebinCourse(input);
    }),
  updateToolRecyclebinCourse: publicProcedure
    .input(updateToolRecyclebinCourseParams)
    .mutation(async ({ input }) => {
      return updateToolRecyclebinCourse(input.id, input);
    }),
  deleteToolRecyclebinCourse: publicProcedure
    .input(toolRecyclebinCourseIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolRecyclebinCourse(input.id);
    }),
});
