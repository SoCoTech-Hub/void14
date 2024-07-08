import { getQuestionAttemptById, getQuestionAttempts } from "../api/questionAttempts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionAttemptIdSchema,
  insertQuestionAttemptParams,
  updateQuestionAttemptParams,
} from "@soco/question-db/schema/questionAttempts";
import { createQuestionAttempt, deleteQuestionAttempt, updateQuestionAttempt } from "../api/questionAttempts/mutations";

export const questionAttemptsRouter =createTRPCRouter({
  getQuestionAttempts: publicProcedure.query(async () => {
    return getQuestionAttempts();
  }),
  getQuestionAttemptById: publicProcedure.input(questionAttemptIdSchema).query(async ({ input }) => {
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
