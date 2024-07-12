import {
  insertQuizFeedbackParams,
  quizFeedbackIdSchema,
  updateQuizFeedbackParams,
} from "@soco/quiz-db/schema/quizFeedbacks";

import {
  createQuizFeedback,
  deleteQuizFeedback,
  updateQuizFeedback,
} from "../api/quizFeedbacks/mutations";
import {
  getQuizFeedbackById,
  getQuizFeedbacks,
} from "../api/quizFeedbacks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quizFeedbacksRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuizFeedbacks: publicProcedure.query(async () => {
      return getQuizFeedbacks();
    }),
    getQuizFeedbackById: publicProcedure
      .input(quizFeedbackIdSchema)
      .query(async ({ input }) => {
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
