import {
  createQuestionCalculatedOption,
  deleteQuestionCalculatedOption,
  updateQuestionCalculatedOption,
} from "../api/questionCalculatedOptions/mutations";
import {
  getQuestionCalculatedOptionById,
  getQuestionCalculatedOptions,
} from "../api/questionCalculatedOptions/queries";
import {
  insertQuestionCalculatedOptionParams,
  questionCalculatedOptionIdSchema,
  updateQuestionCalculatedOptionParams,
} from "../db/schema/questionCalculatedOptions";
import { publicProcedure, router } from "../server/trpc";

export const questionCalculatedOptionsRouter = router({
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
