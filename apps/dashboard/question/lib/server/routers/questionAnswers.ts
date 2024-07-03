import { getQuestionAnswerById, getQuestionAnswers } from "@/lib/api/questionAnswers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionAnswerIdSchema,
  insertQuestionAnswerParams,
  updateQuestionAnswerParams,
} from "@/lib/db/schema/questionAnswers";
import { createQuestionAnswer, deleteQuestionAnswer, updateQuestionAnswer } from "@/lib/api/questionAnswers/mutations";

export const questionAnswersRouter = router({
  getQuestionAnswers: publicProcedure.query(async () => {
    return getQuestionAnswers();
  }),
  getQuestionAnswerById: publicProcedure.input(questionAnswerIdSchema).query(async ({ input }) => {
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
