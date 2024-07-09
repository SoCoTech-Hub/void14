import { getLessonAttemptById, getLessonAttempts } from "../api/lessonAttempts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  lessonAttemptIdSchema,
  insertLessonAttemptParams,
  updateLessonAttemptParams,
} from "@soco/lesson-db/schema/lessonAttempts";
import { createLessonAttempt, deleteLessonAttempt, updateLessonAttempt } from "../api/lessonAttempts/mutations";

export const lessonAttemptsRouter =createTRPCRouter({
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