import { getChoiceAnswerById, getChoiceAnswers } from "@/lib/api/choiceAnswers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  choiceAnswerIdSchema,
  insertChoiceAnswerParams,
  updateChoiceAnswerParams,
} from "@/lib/db/schema/choiceAnswers";
import { createChoiceAnswer, deleteChoiceAnswer, updateChoiceAnswer } from "@/lib/api/choiceAnswers/mutations";

export const choiceAnswersRouter = router({
  getChoiceAnswers: publicProcedure.query(async () => {
    return getChoiceAnswers();
  }),
  getChoiceAnswerById: publicProcedure.input(choiceAnswerIdSchema).query(async ({ input }) => {
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
