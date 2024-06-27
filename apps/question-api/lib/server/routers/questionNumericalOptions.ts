import { getQuestionNumericalOptionById, getQuestionNumericalOptions } from "@/lib/api/questionNumericalOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionNumericalOptionIdSchema,
  insertQuestionNumericalOptionParams,
  updateQuestionNumericalOptionParams,
} from "@/lib/db/schema/questionNumericalOptions";
import { createQuestionNumericalOption, deleteQuestionNumericalOption, updateQuestionNumericalOption } from "@/lib/api/questionNumericalOptions/mutations";

export const questionNumericalOptionsRouter = router({
  getQuestionNumericalOptions: publicProcedure.query(async () => {
    return getQuestionNumericalOptions();
  }),
  getQuestionNumericalOptionById: publicProcedure.input(questionNumericalOptionIdSchema).query(async ({ input }) => {
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
