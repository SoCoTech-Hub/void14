import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "../api/lessons/mutations";
import { getLessonById, getLessons } from "../api/lessons/queries";
import {
  insertLessonParams,
  lessonIdSchema,
  updateLessonParams,
} from "../db/schema/lessons";
import { publicProcedure, router } from "../server/trpc";

export const lessonsRouter = router({
  getLessons: publicProcedure.query(async () => {
    return getLessons();
  }),
  getLessonById: publicProcedure
    .input(lessonIdSchema)
    .query(async ({ input }) => {
      return getLessonById(input.id);
    }),
  createLesson: publicProcedure
    .input(insertLessonParams)
    .mutation(async ({ input }) => {
      return createLesson(input);
    }),
  updateLesson: publicProcedure
    .input(updateLessonParams)
    .mutation(async ({ input }) => {
      return updateLesson(input.id, input);
    }),
  deleteLesson: publicProcedure
    .input(lessonIdSchema)
    .mutation(async ({ input }) => {
      return deleteLesson(input.id);
    }),
});
