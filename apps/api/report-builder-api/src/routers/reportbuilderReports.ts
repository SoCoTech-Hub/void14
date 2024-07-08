import { getReportbuilderReportById, getReportbuilderReports } from "../api/reportbuilderReports/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  reportbuilderReportIdSchema,
  insertReportbuilderReportParams,
  updateReportbuilderReportParams,
} from "@soco/report-builder-db/schema/reportbuilderReports";
import { createReportbuilderReport, deleteReportbuilderReport, updateReportbuilderReport } from "../api/reportbuilderReports/mutations";

export const reportbuilderReportsRouter =createTRPCRouter({
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
