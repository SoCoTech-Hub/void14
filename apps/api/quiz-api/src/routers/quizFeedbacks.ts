import { getQuizFeedbackById, getQuizFeedbacks } from "../api/quizFeedbacks/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizFeedbackIdSchema,
  insertQuizFeedbackParams,
  updateQuizFeedbackParams,
} from "@soco/quiz-db/schema/quizFeedbacks";
import { createQuizFeedback, deleteQuizFeedback, updateQuizFeedback } from "../api/quizFeedbacks/mutations";

export const quizFeedbacksRouter =createTRPCRouter({
  getQuizFeedbacks: publicProcedure.query(async () => {
    return getQuizFeedbacks();
  }),
  getQuizFeedbackById: publicProcedure.input(quizFeedbackIdSchema).query(async ({ input }) => {
    return getQuizFeedbackById(input.id);
  }),
  createQuizFeedback: publicProcedure
    .input(insertQuizFeedbackParams)
    .mutation(async ({ input }) => {
      return createQuizFeedback(input);
    }),
  updateQuizFeedback: publicProcedure
    .input(updateQuizFeedbackParams)
    .mutation(async ({ input }) => {
      return updateQuizFeedback(input.id, input);
    }),
  deleteQuizFeedback: publicProcedure
    .input(quizFeedbackIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizFeedback(input.id);
    }),
});
