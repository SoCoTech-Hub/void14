import { getCoursePublishById, getCoursePublishes } from "@/lib/api/coursePublishes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  coursePublishIdSchema,
  insertCoursePublishParams,
  updateCoursePublishParams,
} from "@/lib/db/schema/coursePublishes";
import { createCoursePublish, deleteCoursePublish, updateCoursePublish } from "@/lib/api/coursePublishes/mutations";

export const coursePublishesRouter = router({
  getCoursePublishes: publicProcedure.query(async () => {
    return getCoursePublishes();
  }),
  getCoursePublishById: publicProcedure.input(coursePublishIdSchema).query(async ({ input }) => {
    return getCoursePublishById(input.id);
  }),
  createCoursePublish: publicProcedure
    .input(insertCoursePublishParams)
    .mutation(async ({ input }) => {
      return createCoursePublish(input);
    }),
  updateCoursePublish: publicProcedure
    .input(updateCoursePublishParams)
    .mutation(async ({ input }) => {
      return updateCoursePublish(input.id, input);
    }),
  deleteCoursePublish: publicProcedure
    .input(coursePublishIdSchema)
    .mutation(async ({ input }) => {
      return deleteCoursePublish(input.id);
    }),
});
