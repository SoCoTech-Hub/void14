import { getQuestionCalculatedOptionById, getQuestionCalculatedOptions } from "../api/questionCalculatedOptions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionCalculatedOptionIdSchema,
  insertQuestionCalculatedOptionParams,
  updateQuestionCalculatedOptionParams,
} from "@soco/question-db/schema/questionCalculatedOptions";
import { createQuestionCalculatedOption, deleteQuestionCalculatedOption, updateQuestionCalculatedOption } from "../api/questionCalculatedOptions/mutations";

export const questionCalculatedOptionsRouter =createTRPCRouter({
  getQuestionCalculatedOptions: publicProcedure.query(async () => {
    return getQuestionCalculatedOptions();
  }),
  getQuestionCalculatedOptionById: publicProcedure.input(questionCalculatedOptionIdSchema).query(async ({ input }) => {
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
