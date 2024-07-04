import {
  createQuizAttempt,
  deleteQuizAttempt,
  updateQuizAttempt,
} from "../api/quizAttempts/mutations";
import {
  getQuizAttemptById,
  getQuizAttempts,
} from "../api/quizAttempts/queries";
import {
  insertQuizAttemptParams,
  quizAttemptIdSchema,
  updateQuizAttemptParams,
} from "../db/schema/quizAttempts";
import { publicProcedure, router } from "../server/trpc";

export const quizAttemptsRouter = router({
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
