import {
  choiceAnswerIdSchema,
  insertChoiceAnswerParams,
  updateChoiceAnswerParams,
} from "@soco/choice-db/schema/choiceAnswers";

import {
  createChoiceAnswer,
  deleteChoiceAnswer,
  updateChoiceAnswer,
} from "../api/choiceAnswers/mutations";
import {
  getChoiceAnswerById,
  getChoiceAnswers,
} from "../api/choiceAnswers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const choiceAnswersRouter = createTRPCRouter({
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
