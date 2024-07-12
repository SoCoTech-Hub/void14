import {
  insertQuestionNumericalOptionParams,
  questionNumericalOptionIdSchema,
  updateQuestionNumericalOptionParams,
} from "@soco/question-db/schema/questionNumericalOptions";

import {
  createQuestionNumericalOption,
  deleteQuestionNumericalOption,
  updateQuestionNumericalOption,
} from "../api/questionNumericalOptions/mutations";
import {
  getQuestionNumericalOptionById,
  getQuestionNumericalOptions,
} from "../api/questionNumericalOptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionNumericalOptionsRouter = createTRPCRouter({
  getQuestionNumericalOptions: publicProcedure.query(async () => {
    return getQuestionNumericalOptions();
  }),
  getQuestionNumericalOptionById: publicProcedure
    .input(questionNumericalOptionIdSchema)
    .query(async ({ input }) => {
      return getQuestionNumericalOptionById(input.id);
    }),
  createQuestionNumericalOption: publicProcedure
    .input(insertQuestionNumericalOptionParams)
    .mutation(async ({ input }) => {
      return createQuestionNumericalOption(input);
    }),
  updateQuestionNumericalOption: publicProcedure
    .input(updateQuestionNumericalOptionParams)
    .mutation(async ({ input }) => {
      return updateQuestionNumericalOption(input.id, input);
    }),
  deleteQuestionNumericalOption: publicProcedure
    .input(questionNumericalOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionNumericalOption(input.id);
    }),
});
