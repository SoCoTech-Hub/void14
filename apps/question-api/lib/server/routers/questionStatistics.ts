import { getQuestionStatisticById, getQuestionStatistics } from "@/lib/api/questionStatistics/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionStatisticIdSchema,
  insertQuestionStatisticParams,
  updateQuestionStatisticParams,
} from "@/lib/db/schema/questionStatistics";
import { createQuestionStatistic, deleteQuestionStatistic, updateQuestionStatistic } from "@/lib/api/questionStatistics/mutations";

export const questionStatisticsRouter = router({
  getQuestionStatistics: publicProcedure.query(async () => {
    return getQuestionStatistics();
  }),
  getQuestionStatisticById: publicProcedure.input(questionStatisticIdSchema).query(async ({ input }) => {
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
