import { getReportbuilderFilterById, getReportbuilderFilters } from "../api/reportbuilderFilters/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  reportbuilderFilterIdSchema,
  insertReportbuilderFilterParams,
  updateReportbuilderFilterParams,
} from "@soco/report-builder-db/schema/reportbuilderFilters";
import { createReportbuilderFilter, deleteReportbuilderFilter, updateReportbuilderFilter } from "../api/reportbuilderFilters/mutations";

export const reportbuilderFiltersRouter =createTRPCRouter({
  getReportbuilderFilters: publicProcedure.query(async () => {
    return getReportbuilderFilters();
  }),
  getReportbuilderFilterById: publicProcedure.input(reportbuilderFilterIdSchema).query(async ({ input }) => {
    return getReportbuilderFilterById(input.id);
  }),
  createReportbuilderFilter: publicProcedure
    .input(insertReportbuilderFilterParams)
    .mutation(async ({ input }) => {
      return createReportbuilderFilter(input);
    }),
  updateReportbuilderFilter: publicProcedure
    .input(updateReportbuilderFilterParams)
    .mutation(async ({ input }) => {
      return updateReportbuilderFilter(input.id, input);
    }),
  deleteReportbuilderFilter: publicProcedure
    .input(reportbuilderFilterIdSchema)
    .mutation(async ({ input }) => {
      return deleteReportbuilderFilter(input.id);
    }),
});
