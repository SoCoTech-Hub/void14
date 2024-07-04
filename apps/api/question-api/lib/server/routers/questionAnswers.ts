import {
  createQuestionAnswer,
  deleteQuestionAnswer,
  updateQuestionAnswer,
} from "../api/questionAnswers/mutations";
import {
  getQuestionAnswerById,
  getQuestionAnswers,
} from "../api/questionAnswers/queries";
import {
  insertQuestionAnswerParams,
  questionAnswerIdSchema,
  updateQuestionAnswerParams,
} from "../db/schema/questionAnswers";
import { publicProcedure, router } from "../server/trpc";

export const questionAnswersRouter = router({
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
