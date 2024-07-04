import {
  createCoursePublish,
  deleteCoursePublish,
  updateCoursePublish,
} from "../api/coursePublishes/mutations";
import {
  getCoursePublishById,
  getCoursePublishes,
} from "../api/coursePublishes/queries";
import {
  coursePublishIdSchema,
  insertCoursePublishParams,
  updateCoursePublishParams,
} from "../db/schema/coursePublishes";
import { publicProcedure, router } from "../server/trpc";

export const coursePublishesRouter = router({
  getCoursePublishes: publicProcedure.query(async () => {
    return getCoursePublishes();
  }),
  getCoursePublishById: publicProcedure
    .input(coursePublishIdSchema)
    .query(async ({ input }) => {
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
