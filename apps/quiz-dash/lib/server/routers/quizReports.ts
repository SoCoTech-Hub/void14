import { getQuizReportById, getQuizReports } from "@/lib/api/quizReports/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizReportIdSchema,
  insertQuizReportParams,
  updateQuizReportParams,
} from "@/lib/db/schema/quizReports";
import { createQuizReport, deleteQuizReport, updateQuizReport } from "@/lib/api/quizReports/mutations";

export const quizReportsRouter = router({
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
