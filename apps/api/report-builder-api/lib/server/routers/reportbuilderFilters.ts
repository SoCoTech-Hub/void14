import {
  createReportbuilderFilter,
  deleteReportbuilderFilter,
  updateReportbuilderFilter,
} from "../api/reportbuilderFilters/mutations";
import {
  getReportbuilderFilterById,
  getReportbuilderFilters,
} from "../api/reportbuilderFilters/queries";
import {
  insertReportbuilderFilterParams,
  reportbuilderFilterIdSchema,
  updateReportbuilderFilterParams,
} from "../db/schema/reportbuilderFilters";
import { publicProcedure, router } from "../server/trpc";

export const reportbuilderFiltersRouter = router({
  getReportbuilderFilters: publicProcedure.query(async () => {
    return getReportbuilderFilters();
  }),
  getReportbuilderFilterById: publicProcedure
    .input(reportbuilderFilterIdSchema)
    .query(async ({ input }) => {
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
