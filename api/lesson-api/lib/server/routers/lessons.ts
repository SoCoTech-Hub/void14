import { getLessonById, getLessons } from "@/lib/api/lessons/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonIdSchema,
  insertLessonParams,
  updateLessonParams,
} from "@/lib/db/schema/lessons";
import { createLesson, deleteLesson, updateLesson } from "@/lib/api/lessons/mutations";

export const lessonsRouter = router({
  getLessons: publicProcedure.query(async () => {
    return getLessons();
  }),
  getLessonById: publicProcedure.input(lessonIdSchema).query(async ({ input }) => {
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
