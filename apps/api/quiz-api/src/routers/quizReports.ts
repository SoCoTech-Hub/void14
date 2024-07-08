import { getQuizReportById, getQuizReports } from "../api/quizReports/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizReportIdSchema,
  insertQuizReportParams,
  updateQuizReportParams,
} from "@soco/quiz-db/schema/quizReports";
import { createQuizReport, deleteQuizReport, updateQuizReport } from "../api/quizReports/mutations";

export const quizReportsRouter =createTRPCRouter({
  getQuizReports: publicProcedure.query(async () => {
    return getQuizReports();
  }),
  getQuizReportById: publicProcedure.input(quizReportIdSchema).query(async ({ input }) => {
    return getQuizReportById(input.id);
  }),
  createQuizReport: publicProcedure
    .input(insertQuizReportParams)
    .mutation(async ({ input }) => {
      return createQuizReport(input);
    }),
  updateQuizReport: publicProcedure
    .input(updateQuizReportParams)
    .mutation(async ({ input }) => {
      return updateQuizReport(input.id, input);
    }),
  deleteQuizReport: publicProcedure
    .input(quizReportIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizReport(input.id);
    }),
});
