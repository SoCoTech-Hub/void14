import { getZoomLessonById, getZoomLessons } from "@/lib/api/zoomLessons/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  zoomLessonIdSchema,
  insertZoomLessonParams,
  updateZoomLessonParams,
} from "@/lib/db/schema/zoomLessons";
import { createZoomLesson, deleteZoomLesson, updateZoomLesson } from "@/lib/api/zoomLessons/mutations";

export const zoomLessonsRouter = router({
  getZoomLessons: publicProcedure.query(async () => {
    return getZoomLessons();
  }),
  getZoomLessonById: publicProcedure.input(zoomLessonIdSchema).query(async ({ input }) => {
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
