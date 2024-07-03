import { getLessonAttemptById, getLessonAttempts } from "@/lib/api/lessonAttempts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonAttemptIdSchema,
  insertLessonAttemptParams,
  updateLessonAttemptParams,
} from "@/lib/db/schema/lessonAttempts";
import { createLessonAttempt, deleteLessonAttempt, updateLessonAttempt } from "@/lib/api/lessonAttempts/mutations";

export const lessonAttemptsRouter = router({
  getLessonAttempts: publicProcedure.query(async () => {
    return getLessonAttempts();
  }),
  getLessonAttemptById: publicProcedure.input(lessonAttemptIdSchema).query(async ({ input }) => {
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
