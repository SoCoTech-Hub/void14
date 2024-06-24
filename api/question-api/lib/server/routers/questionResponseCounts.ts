import { getQuestionResponseCountById, getQuestionResponseCounts } from "@/lib/api/questionResponseCounts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionResponseCountIdSchema,
  insertQuestionResponseCountParams,
  updateQuestionResponseCountParams,
} from "@/lib/db/schema/questionResponseCounts";
import { createQuestionResponseCount, deleteQuestionResponseCount, updateQuestionResponseCount } from "@/lib/api/questionResponseCounts/mutations";

export const questionResponseCountsRouter = router({
  getQuestionResponseCounts: publicProcedure.query(async () => {
    return getQuestionResponseCounts();
  }),
  getQuestionResponseCountById: publicProcedure.input(questionResponseCountIdSchema).query(async ({ input }) => {
    return getQuestionResponseCountById(input.id);
  }),
  createQuestionResponseCount: publicProcedure
    .input(insertQuestionResponseCountParams)
    .mutation(async ({ input }) => {
      return createQuestionResponseCount(input);
    }),
  updateQuestionResponseCount: publicProcedure
    .input(updateQuestionResponseCountParams)
    .mutation(async ({ input }) => {
      return updateQuestionResponseCount(input.id, input);
    }),
  deleteQuestionResponseCount: publicProcedure
    .input(questionResponseCountIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionResponseCount(input.id);
    }),
});
