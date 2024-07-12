import {
  insertQuestionCalculatedOptionParams,
  questionCalculatedOptionIdSchema,
  updateQuestionCalculatedOptionParams,
} from "@soco/question-db/schema/questionCalculatedOptions";

import {
  createQuestionCalculatedOption,
  deleteQuestionCalculatedOption,
  updateQuestionCalculatedOption,
} from "../api/questionCalculatedOptions/mutations";
import {
  getQuestionCalculatedOptionById,
  getQuestionCalculatedOptions,
} from "../api/questionCalculatedOptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionCalculatedOptionsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getQuestionCalculatedOptions: publicProcedure.query(async () => {
    return getQuestionCalculatedOptions();
  }),
  getQuestionCalculatedOptionById: publicProcedure
    .input(questionCalculatedOptionIdSchema)
    .query(async ({ input }) => {
      return getQuestionCalculatedOptionById(input.id);
    }),
  createQuestionCalculatedOption: publicProcedure
    .input(insertQuestionCalculatedOptionParams)
    .mutation(async ({ input }) => {
      return createQuestionCalculatedOption(input);
    }),
  updateQuestionCalculatedOption: publicProcedure
    .input(updateQuestionCalculatedOptionParams)
    .mutation(async ({ input }) => {
      return updateQuestionCalculatedOption(input.id, input);
    }),
  deleteQuestionCalculatedOption: publicProcedure
    .input(questionCalculatedOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionCalculatedOption(input.id);
    }),
});
