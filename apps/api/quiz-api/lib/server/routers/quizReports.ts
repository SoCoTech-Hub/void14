import {
  createQuizReport,
  deleteQuizReport,
  updateQuizReport,
} from "../api/quizReports/mutations";
import { getQuizReportById, getQuizReports } from "../api/quizReports/queries";
import {
  insertQuizReportParams,
  quizReportIdSchema,
  updateQuizReportParams,
} from "../db/schema/quizReports";
import { publicProcedure, router } from "../server/trpc";

export const quizReportsRouter = router({
  getQuizReports: publicProcedure.query(async () => {
    return getQuizReports();
  }),
  getQuizReportById: publicProcedure
    .input(quizReportIdSchema)
    .query(async ({ input }) => {
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
