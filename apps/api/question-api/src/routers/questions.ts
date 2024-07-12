import {
  insertQuestionParams,
  questionIdSchema,
  updateQuestionParams,
} from "@soco/question-db/schema/questions";

import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../api/questions/mutations";
import { getQuestionById, getQuestions } from "../api/questions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuestions: publicProcedure.query(async () => {
      return getQuestions();
    }),
    getQuestionById: publicProcedure
      .input(questionIdSchema)
      .query(async ({ input }) => {
        return getQuestionById(input.id);
      }),
    createQuestion: publicProcedure
      .input(insertQuestionParams)
      .mutation(async ({ input }) => {
        return createQuestion(input);
      }),
    updateQuestion: publicProcedure
      .input(updateQuestionParams)
      .mutation(async ({ input }) => {
        return updateQuestion(input.id, input);
      }),
    deleteQuestion: publicProcedure
      .input(questionIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuestion(input.id);
      }),
  });
