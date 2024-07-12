import {
  insertQuestionAnswerParams,
  questionAnswerIdSchema,
  updateQuestionAnswerParams,
} from "@soco/question-db/schema/questionAnswers";

import {
  createQuestionAnswer,
  deleteQuestionAnswer,
  updateQuestionAnswer,
} from "../api/questionAnswers/mutations";
import {
  getQuestionAnswerById,
  getQuestionAnswers,
} from "../api/questionAnswers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionAnswersRouter = createTRPCRouter({
  getQuestionAnswers: publicProcedure.query(async () => {
    return getQuestionAnswers();
  }),
  getQuestionAnswerById: publicProcedure
    .input(questionAnswerIdSchema)
    .query(async ({ input }) => {
      return getQuestionAnswerById(input.id);
    }),
  createQuestionAnswer: publicProcedure
    .input(insertQuestionAnswerParams)
    .mutation(async ({ input }) => {
      return createQuestionAnswer(input);
    }),
  updateQuestionAnswer: publicProcedure
    .input(updateQuestionAnswerParams)
    .mutation(async ({ input }) => {
      return updateQuestionAnswer(input.id, input);
    }),
  deleteQuestionAnswer: publicProcedure
    .input(questionAnswerIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionAnswer(input.id);
    }),
});
