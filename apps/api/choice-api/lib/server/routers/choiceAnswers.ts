import {
  createChoiceAnswer,
  deleteChoiceAnswer,
  updateChoiceAnswer,
} from "../api/choiceAnswers/mutations";
import {
  getChoiceAnswerById,
  getChoiceAnswers,
} from "../api/choiceAnswers/queries";
import {
  choiceAnswerIdSchema,
  insertChoiceAnswerParams,
  updateChoiceAnswerParams,
} from "../db/schema/choiceAnswers";
import { publicProcedure, router } from "../server/trpc";

export const choiceAnswersRouter = router({
  getChoiceAnswers: publicProcedure.query(async () => {
    return getChoiceAnswers();
  }),
  getChoiceAnswerById: publicProcedure
    .input(choiceAnswerIdSchema)
    .query(async ({ input }) => {
      return getChoiceAnswerById(input.id);
    }),
  createChoiceAnswer: publicProcedure
    .input(insertChoiceAnswerParams)
    .mutation(async ({ input }) => {
      return createChoiceAnswer(input);
    }),
  updateChoiceAnswer: publicProcedure
    .input(updateChoiceAnswerParams)
    .mutation(async ({ input }) => {
      return updateChoiceAnswer(input.id, input);
    }),
  deleteChoiceAnswer: publicProcedure
    .input(choiceAnswerIdSchema)
    .mutation(async ({ input }) => {
      return deleteChoiceAnswer(input.id);
    }),
});
