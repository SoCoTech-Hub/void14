import { getReportbuilderReportById, getReportbuilderReports } from "@/lib/api/reportbuilderReports/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  reportbuilderReportIdSchema,
  insertReportbuilderReportParams,
  updateReportbuilderReportParams,
} from "@/lib/db/schema/reportbuilderReports";
import { createReportbuilderReport, deleteReportbuilderReport, updateReportbuilderReport } from "@/lib/api/reportbuilderReports/mutations";

export const reportbuilderReportsRouter = router({
  getReportbuilderReports: publicProcedure.query(async () => {
    return getReportbuilderReports();
  }),
  getReportbuilderReportById: publicProcedure.input(reportbuilderReportIdSchema).query(async ({ input }) => {
    return getReportbuilderReportById(input.id);
  }),
  createReportbuilderReport: publicProcedure
    .input(insertReportbuilderReportParams)
    .mutation(async ({ input }) => {
      return createReportbuilderReport(input);
    }),
  updateReportbuilderReport: publicProcedure
    .input(updateReportbuilderReportParams)
    .mutation(async ({ input }) => {
      return updateReportbuilderReport(input.id, input);
    }),
  deleteReportbuilderReport: publicProcedure
    .input(reportbuilderReportIdSchema)
    .mutation(async ({ input }) => {
      return deleteReportbuilderReport(input.id);
    }),
});
