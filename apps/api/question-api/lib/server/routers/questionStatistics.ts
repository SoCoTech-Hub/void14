import {
  createQuestionStatistic,
  deleteQuestionStatistic,
  updateQuestionStatistic,
} from "../api/questionStatistics/mutations";
import {
  getQuestionStatisticById,
  getQuestionStatistics,
} from "../api/questionStatistics/queries";
import {
  insertQuestionStatisticParams,
  questionStatisticIdSchema,
  updateQuestionStatisticParams,
} from "../db/schema/questionStatistics";
import { publicProcedure, router } from "../server/trpc";

export const questionStatisticsRouter = router({
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
