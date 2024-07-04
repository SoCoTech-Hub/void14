import {
  createQuestionResponseCount,
  deleteQuestionResponseCount,
  updateQuestionResponseCount,
} from "../api/questionResponseCounts/mutations";
import {
  getQuestionResponseCountById,
  getQuestionResponseCounts,
} from "../api/questionResponseCounts/queries";
import {
  insertQuestionResponseCountParams,
  questionResponseCountIdSchema,
  updateQuestionResponseCountParams,
} from "../db/schema/questionResponseCounts";
import { publicProcedure, router } from "../server/trpc";

export const questionResponseCountsRouter = router({
  getQuestionResponseCounts: publicProcedure.query(async () => {
    return getQuestionResponseCounts();
  }),
  getQuestionResponseCountById: publicProcedure
    .input(questionResponseCountIdSchema)
    .query(async ({ input }) => {
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
