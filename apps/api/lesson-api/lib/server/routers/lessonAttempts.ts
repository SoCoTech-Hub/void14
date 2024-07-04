import {
  createLessonAttempt,
  deleteLessonAttempt,
  updateLessonAttempt,
} from "../api/lessonAttempts/mutations";
import {
  getLessonAttemptById,
  getLessonAttempts,
} from "../api/lessonAttempts/queries";
import {
  insertLessonAttemptParams,
  lessonAttemptIdSchema,
  updateLessonAttemptParams,
} from "../db/schema/lessonAttempts";
import { publicProcedure, router } from "../server/trpc";

export const lessonAttemptsRouter = router({
  getLessonAttempts: publicProcedure.query(async () => {
    return getLessonAttempts();
  }),
  getLessonAttemptById: publicProcedure
    .input(lessonAttemptIdSchema)
    .query(async ({ input }) => {
      return getLessonAttemptById(input.id);
    }),
  createLessonAttempt: publicProcedure
    .input(insertLessonAttemptParams)
    .mutation(async ({ input }) => {
      return createLessonAttempt(input);
    }),
  updateLessonAttempt: publicProcedure
    .input(updateLessonAttemptParams)
    .mutation(async ({ input }) => {
      return updateLessonAttempt(input.id, input);
    }),
  deleteLessonAttempt: publicProcedure
    .input(lessonAttemptIdSchema)
    .mutation(async ({ input }) => {
      return deleteLessonAttempt(input.id);
    }),
});
