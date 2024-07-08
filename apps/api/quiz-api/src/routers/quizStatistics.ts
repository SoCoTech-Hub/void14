import { getQuizStatisticById, getQuizStatistics } from "../api/quizStatistics/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizStatisticIdSchema,
  insertQuizStatisticParams,
  updateQuizStatisticParams,
} from "@soco/quiz-db/schema/quizStatistics";
import { createQuizStatistic, deleteQuizStatistic, updateQuizStatistic } from "../api/quizStatistics/mutations";

export const quizStatisticsRouter =createTRPCRouter({
  getQuizStatistics: publicProcedure.query(async () => {
    return getQuizStatistics();
  }),
  getQuizStatisticById: publicProcedure.input(quizStatisticIdSchema).query(async ({ input }) => {
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
