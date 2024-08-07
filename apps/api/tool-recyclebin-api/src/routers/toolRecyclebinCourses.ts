import {
  insertToolRecyclebinCourseParams,
  toolRecyclebinCourseIdSchema,
  updateToolRecyclebinCourseParams,
} from "@soco/tool-recyclebin-db/schema/toolRecyclebinCourses";

import {
  createToolRecyclebinCourse,
  deleteToolRecyclebinCourse,
  updateToolRecyclebinCourse,
} from "../api/toolRecyclebinCourses/mutations";
import {
  getToolRecyclebinCourseById,
  getToolRecyclebinCourses,
} from "../api/toolRecyclebinCourses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolRecyclebinCoursesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getToolRecyclebinCourses: publicProcedure.query(async () => {
      return getToolRecyclebinCourses();
    }),
    getToolRecyclebinCourseById: publicProcedure
      .input(toolRecyclebinCourseIdSchema)
      .query(async ({ input }) => {
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
