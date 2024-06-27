import { getQuestionCalculatedOptionById, getQuestionCalculatedOptions } from "@/lib/api/questionCalculatedOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionCalculatedOptionIdSchema,
  insertQuestionCalculatedOptionParams,
  updateQuestionCalculatedOptionParams,
} from "@/lib/db/schema/questionCalculatedOptions";
import { createQuestionCalculatedOption, deleteQuestionCalculatedOption, updateQuestionCalculatedOption } from "@/lib/api/questionCalculatedOptions/mutations";

export const questionCalculatedOptionsRouter = router({
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
