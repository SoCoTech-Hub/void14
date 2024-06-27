import { getQuestionUsageById, getQuestionUsages } from "@/lib/api/questionUsages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionUsageIdSchema,
  insertQuestionUsageParams,
  updateQuestionUsageParams,
} from "@/lib/db/schema/questionUsages";
import { createQuestionUsage, deleteQuestionUsage, updateQuestionUsage } from "@/lib/api/questionUsages/mutations";

export const questionUsagesRouter = router({
  getQuestionUsages: publicProcedure.query(async () => {
    return getQuestionUsages();
  }),
  getQuestionUsageById: publicProcedure.input(questionUsageIdSchema).query(async ({ input }) => {
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
