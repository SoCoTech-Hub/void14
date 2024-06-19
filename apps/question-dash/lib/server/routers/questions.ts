import { getQuestionById, getQuestions } from "@/lib/api/questions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionIdSchema,
  insertQuestionParams,
  updateQuestionParams,
} from "@/lib/db/schema/questions";
import { createQuestion, deleteQuestion, updateQuestion } from "@/lib/api/questions/mutations";

export const questionsRouter = router({
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
