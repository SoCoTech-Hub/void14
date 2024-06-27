import { getReportbuilderColumnById, getReportbuilderColumns } from "@/lib/api/reportbuilderColumns/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  reportbuilderColumnIdSchema,
  insertReportbuilderColumnParams,
  updateReportbuilderColumnParams,
} from "@/lib/db/schema/reportbuilderColumns";
import { createReportbuilderColumn, deleteReportbuilderColumn, updateReportbuilderColumn } from "@/lib/api/reportbuilderColumns/mutations";

export const reportbuilderColumnsRouter = router({
  getReportbuilderColumns: publicProcedure.query(async () => {
    return getReportbuilderColumns();
  }),
  getReportbuilderColumnById: publicProcedure.input(reportbuilderColumnIdSchema).query(async ({ input }) => {
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
