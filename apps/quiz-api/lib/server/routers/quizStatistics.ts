import { getQuizStatisticById, getQuizStatistics } from "@/lib/api/quizStatistics/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizStatisticIdSchema,
  insertQuizStatisticParams,
  updateQuizStatisticParams,
} from "@/lib/db/schema/quizStatistics";
import { createQuizStatistic, deleteQuizStatistic, updateQuizStatistic } from "@/lib/api/quizStatistics/mutations";

export const quizStatisticsRouter = router({
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
