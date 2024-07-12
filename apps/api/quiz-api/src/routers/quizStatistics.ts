import {
  insertQuizStatisticParams,
  quizStatisticIdSchema,
  updateQuizStatisticParams,
} from "@soco/quiz-db/schema/quizStatistics";

import {
  createQuizStatistic,
  deleteQuizStatistic,
  updateQuizStatistic,
} from "../api/quizStatistics/mutations";
import {
  getQuizStatisticById,
  getQuizStatistics,
} from "../api/quizStatistics/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quizStatisticsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuizStatistics: publicProcedure.query(async () => {
      return getQuizStatistics();
    }),
    getQuizStatisticById: publicProcedure
      .input(quizStatisticIdSchema)
      .query(async ({ input }) => {
        return getQuizStatisticById(input.id);
      }),
    createQuizStatistic: publicProcedure
      .input(insertQuizStatisticParams)
      .mutation(async ({ input }) => {
        return createQuizStatistic(input);
      }),
    updateQuizStatistic: publicProcedure
      .input(updateQuizStatisticParams)
      .mutation(async ({ input }) => {
        return updateQuizStatistic(input.id, input);
      }),
    deleteQuizStatistic: publicProcedure
      .input(quizStatisticIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuizStatistic(input.id);
      }),
  });
