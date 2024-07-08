import { getLessonAnswerById, getLessonAnswers } from "../api/lessonAnswers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  lessonAnswerIdSchema,
  insertLessonAnswerParams,
  updateLessonAnswerParams,
} from "@soco/lesson-db/schema/lessonAnswers";
import { createLessonAnswer, deleteLessonAnswer, updateLessonAnswer } from "../api/lessonAnswers/mutations";

export const lessonAnswersRouter =createTRPCRouter({
  getLessonAnswers: publicProcedure.query(async () => {
    return getLessonAnswers();
  }),
  getLessonAnswerById: publicProcedure.input(lessonAnswerIdSchema).query(async ({ input }) => {
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
