import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../api/questions/mutations";
import { getQuestionById, getQuestions } from "../api/questions/queries";
import {
  insertQuestionParams,
  questionIdSchema,
  updateQuestionParams,
} from "../db/schema/questions";
import { publicProcedure, router } from "../server/trpc";

export const questionsRouter = router({
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
