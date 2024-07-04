import {
  createQuestionUsage,
  deleteQuestionUsage,
  updateQuestionUsage,
} from "../api/questionUsages/mutations";
import {
  getQuestionUsageById,
  getQuestionUsages,
} from "../api/questionUsages/queries";
import {
  insertQuestionUsageParams,
  questionUsageIdSchema,
  updateQuestionUsageParams,
} from "../db/schema/questionUsages";
import { publicProcedure, router } from "../server/trpc";

export const questionUsagesRouter = router({
  getQuestionUsages: publicProcedure.query(async () => {
    return getQuestionUsages();
  }),
  getQuestionUsageById: publicProcedure
    .input(questionUsageIdSchema)
    .query(async ({ input }) => {
      return getQuestionUsageById(input.id);
    }),
  createQuestionUsage: publicProcedure
    .input(insertQuestionUsageParams)
    .mutation(async ({ input }) => {
      return createQuestionUsage(input);
    }),
  updateQuestionUsage: publicProcedure
    .input(updateQuestionUsageParams)
    .mutation(async ({ input }) => {
      return updateQuestionUsage(input.id, input);
    }),
  deleteQuestionUsage: publicProcedure
    .input(questionUsageIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionUsage(input.id);
    }),
});
