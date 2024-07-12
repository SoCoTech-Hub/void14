import {
  insertLessonAnswerParams,
  lessonAnswerIdSchema,
  updateLessonAnswerParams,
} from "@soco/lesson-db/schema/lessonAnswers";

import {
  createLessonAnswer,
  deleteLessonAnswer,
  updateLessonAnswer,
} from "../api/lessonAnswers/mutations";
import {
  getLessonAnswerById,
  getLessonAnswers,
} from "../api/lessonAnswers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const lessonAnswersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getLessonAnswers: publicProcedure.query(async () => {
      return getLessonAnswers();
    }),
    getLessonAnswerById: publicProcedure
      .input(lessonAnswerIdSchema)
      .query(async ({ input }) => {
        return getLessonAnswerById(input.id);
      }),
    createLessonAnswer: publicProcedure
      .input(insertLessonAnswerParams)
      .mutation(async ({ input }) => {
        return createLessonAnswer(input);
      }),
    updateLessonAnswer: publicProcedure
      .input(updateLessonAnswerParams)
      .mutation(async ({ input }) => {
        return updateLessonAnswer(input.id, input);
      }),
    deleteLessonAnswer: publicProcedure
      .input(lessonAnswerIdSchema)
      .mutation(async ({ input }) => {
        return deleteLessonAnswer(input.id);
      }),
  });
