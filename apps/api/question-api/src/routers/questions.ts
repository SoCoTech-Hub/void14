import { getQuestionById, getQuestions } from "../api/questions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionIdSchema,
  insertQuestionParams,
  updateQuestionParams,
} from "@soco/question-db/schema/questions";
import { createQuestion, deleteQuestion, updateQuestion } from "../api/questions/mutations";

export const questionsRouter =createTRPCRouter({
  getQuestions: publicProcedure.query(async () => {
    return getQuestions();
  }),
  getQuestionById: publicProcedure.input(questionIdSchema).query(async ({ input }) => {
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
