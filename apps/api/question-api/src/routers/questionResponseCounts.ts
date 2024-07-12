import {
  insertQuestionResponseCountParams,
  questionResponseCountIdSchema,
  updateQuestionResponseCountParams,
} from "@soco/question-db/schema/questionResponseCounts";

import {
  createQuestionResponseCount,
  deleteQuestionResponseCount,
  updateQuestionResponseCount,
} from "../api/questionResponseCounts/mutations";
import {
  getQuestionResponseCountById,
  getQuestionResponseCounts,
} from "../api/questionResponseCounts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionResponseCountsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
