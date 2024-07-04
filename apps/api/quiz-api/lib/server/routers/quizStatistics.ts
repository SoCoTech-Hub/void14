import {
  createQuizStatistic,
  deleteQuizStatistic,
  updateQuizStatistic,
} from "../api/quizStatistics/mutations";
import {
  getQuizStatisticById,
  getQuizStatistics,
} from "../api/quizStatistics/queries";
import {
  insertQuizStatisticParams,
  quizStatisticIdSchema,
  updateQuizStatisticParams,
} from "../db/schema/quizStatistics";
import { publicProcedure, router } from "../server/trpc";

export const quizStatisticsRouter = router({
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
