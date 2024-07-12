import {
  insertQuizAttemptParams,
  quizAttemptIdSchema,
  updateQuizAttemptParams,
} from "@soco/quiz-db/schema/quizAttempts";

import {
  createQuizAttempt,
  deleteQuizAttempt,
  updateQuizAttempt,
} from "../api/quizAttempts/mutations";
import {
  getQuizAttemptById,
  getQuizAttempts,
} from "../api/quizAttempts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quizAttemptsRouter = createTRPCRouter({
  getQuizAttempts: publicProcedure.query(async () => {
    return getQuizAttempts();
  }),
  getQuizAttemptById: publicProcedure
    .input(quizAttemptIdSchema)
    .query(async ({ input }) => {
      return getQuizAttemptById(input.id);
    }),
  createQuizAttempt: publicProcedure
    .input(insertQuizAttemptParams)
    .mutation(async ({ input }) => {
      return createQuizAttempt(input);
    }),
  updateQuizAttempt: publicProcedure
    .input(updateQuizAttemptParams)
    .mutation(async ({ input }) => {
      return updateQuizAttempt(input.id, input);
    }),
  deleteQuizAttempt: publicProcedure
    .input(quizAttemptIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizAttempt(input.id);
    }),
});
