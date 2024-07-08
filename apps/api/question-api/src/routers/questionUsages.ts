import { getQuestionUsageById, getQuestionUsages } from "../api/questionUsages/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionUsageIdSchema,
  insertQuestionUsageParams,
  updateQuestionUsageParams,
} from "@soco/question-db/schema/questionUsages";
import { createQuestionUsage, deleteQuestionUsage, updateQuestionUsage } from "../api/questionUsages/mutations";

export const questionUsagesRouter =createTRPCRouter({
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
