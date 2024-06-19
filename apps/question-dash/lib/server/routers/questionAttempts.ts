import { getQuestionAttemptById, getQuestionAttempts } from "@/lib/api/questionAttempts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionAttemptIdSchema,
  insertQuestionAttemptParams,
  updateQuestionAttemptParams,
} from "@/lib/db/schema/questionAttempts";
import { createQuestionAttempt, deleteQuestionAttempt, updateQuestionAttempt } from "@/lib/api/questionAttempts/mutations";

export const questionAttemptsRouter = router({
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
