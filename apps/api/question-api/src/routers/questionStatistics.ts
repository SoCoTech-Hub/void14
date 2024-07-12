import {
  insertQuestionStatisticParams,
  questionStatisticIdSchema,
  updateQuestionStatisticParams,
} from "@soco/question-db/schema/questionStatistics";

import {
  createQuestionStatistic,
  deleteQuestionStatistic,
  updateQuestionStatistic,
} from "../api/questionStatistics/mutations";
import {
  getQuestionStatisticById,
  getQuestionStatistics,
} from "../api/questionStatistics/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionStatisticsRouter = createTRPCRouter({
  getQuestionStatistics: publicProcedure.query(async () => {
    return getQuestionStatistics();
  }),
  getQuestionStatisticById: publicProcedure
    .input(questionStatisticIdSchema)
    .query(async ({ input }) => {
      return getQuestionStatisticById(input.id);
    }),
  createQuestionStatistic: publicProcedure
    .input(insertQuestionStatisticParams)
    .mutation(async ({ input }) => {
      return createQuestionStatistic(input);
    }),
  updateQuestionStatistic: publicProcedure
    .input(updateQuestionStatisticParams)
    .mutation(async ({ input }) => {
      return updateQuestionStatistic(input.id, input);
    }),
  deleteQuestionStatistic: publicProcedure
    .input(questionStatisticIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionStatistic(input.id);
    }),
});
