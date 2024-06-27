import { getReportbuilderFilterById, getReportbuilderFilters } from "@/lib/api/reportbuilderFilters/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  reportbuilderFilterIdSchema,
  insertReportbuilderFilterParams,
  updateReportbuilderFilterParams,
} from "@/lib/db/schema/reportbuilderFilters";
import { createReportbuilderFilter, deleteReportbuilderFilter, updateReportbuilderFilter } from "@/lib/api/reportbuilderFilters/mutations";

export const reportbuilderFiltersRouter = router({
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
