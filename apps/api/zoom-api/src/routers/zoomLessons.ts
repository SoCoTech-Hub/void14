import {
  insertZoomLessonParams,
  updateZoomLessonParams,
  zoomLessonIdSchema,
} from "@soco/zoom-db/schema/zoomLessons";

import {
  createZoomLesson,
  deleteZoomLesson,
  updateZoomLesson,
} from "../api/zoomLessons/mutations";
import { getZoomLessonById, getZoomLessons } from "../api/zoomLessons/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const zoomLessonsRouter = createTRPCRouter({
  getZoomLessons: publicProcedure.query(async () => {
    return getZoomLessons();
  }),
  getZoomLessonById: publicProcedure
    .input(zoomLessonIdSchema)
    .query(async ({ input }) => {
      return getZoomLessonById(input.id);
    }),
  createZoomLesson: publicProcedure
    .input(insertZoomLessonParams)
    .mutation(async ({ input }) => {
      return createZoomLesson(input);
    }),
  updateZoomLesson: publicProcedure
    .input(updateZoomLessonParams)
    .mutation(async ({ input }) => {
      return updateZoomLesson(input.id, input);
    }),
  deleteZoomLesson: publicProcedure
    .input(zoomLessonIdSchema)
    .mutation(async ({ input }) => {
      return deleteZoomLesson(input.id);
    }),
});
