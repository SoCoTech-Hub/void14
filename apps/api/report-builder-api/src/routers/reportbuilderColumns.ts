import {
  insertReportbuilderColumnParams,
  reportbuilderColumnIdSchema,
  updateReportbuilderColumnParams,
} from "@soco/report-builder-db/schema/reportbuilderColumns";

import {
  createReportbuilderColumn,
  deleteReportbuilderColumn,
  updateReportbuilderColumn,
} from "../api/reportbuilderColumns/mutations";
import {
  getReportbuilderColumnById,
  getReportbuilderColumns,
} from "../api/reportbuilderColumns/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const reportbuilderColumnsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getReportbuilderColumns: publicProcedure.query(async () => {
      return getReportbuilderColumns();
    }),
    getReportbuilderColumnById: publicProcedure
      .input(reportbuilderColumnIdSchema)
      .query(async ({ input }) => {
        return getReportbuilderColumnById(input.id);
      }),
    createReportbuilderColumn: publicProcedure
      .input(insertReportbuilderColumnParams)
      .mutation(async ({ input }) => {
        return createReportbuilderColumn(input);
      }),
    updateReportbuilderColumn: publicProcedure
      .input(updateReportbuilderColumnParams)
      .mutation(async ({ input }) => {
        return updateReportbuilderColumn(input.id, input);
      }),
    deleteReportbuilderColumn: publicProcedure
      .input(reportbuilderColumnIdSchema)
      .mutation(async ({ input }) => {
        return deleteReportbuilderColumn(input.id);
      }),
  });
