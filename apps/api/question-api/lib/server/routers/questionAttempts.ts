import {
  createQuestionAttempt,
  deleteQuestionAttempt,
  updateQuestionAttempt,
} from "../api/questionAttempts/mutations";
import {
  getQuestionAttemptById,
  getQuestionAttempts,
} from "../api/questionAttempts/queries";
import {
  insertQuestionAttemptParams,
  questionAttemptIdSchema,
  updateQuestionAttemptParams,
} from "../db/schema/questionAttempts";
import { publicProcedure, router } from "../server/trpc";

export const questionAttemptsRouter = router({
  getQuestionAttempts: publicProcedure.query(async () => {
    return getQuestionAttempts();
  }),
  getQuestionAttemptById: publicProcedure
    .input(questionAttemptIdSchema)
    .query(async ({ input }) => {
      return getQuestionAttemptById(input.id);
    }),
  createQuestionAttempt: publicProcedure
    .input(insertQuestionAttemptParams)
    .mutation(async ({ input }) => {
      return createQuestionAttempt(input);
    }),
  updateQuestionAttempt: publicProcedure
    .input(updateQuestionAttemptParams)
    .mutation(async ({ input }) => {
      return updateQuestionAttempt(input.id, input);
    }),
  deleteQuestionAttempt: publicProcedure
    .input(questionAttemptIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionAttempt(input.id);
    }),
});
