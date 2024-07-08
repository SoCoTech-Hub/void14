import { getReportbuilderAudienceById, getReportbuilderAudiences } from "../api/reportbuilderAudiences/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  reportbuilderAudienceIdSchema,
  insertReportbuilderAudienceParams,
  updateReportbuilderAudienceParams,
} from "@soco/report-builder-db/schema/reportbuilderAudiences";
import { createReportbuilderAudience, deleteReportbuilderAudience, updateReportbuilderAudience } from "../api/reportbuilderAudiences/mutations";

export const reportbuilderAudiencesRouter =createTRPCRouter({
  getReportbuilderAudiences: publicProcedure.query(async () => {
    return getReportbuilderAudiences();
  }),
  getReportbuilderAudienceById: publicProcedure.input(reportbuilderAudienceIdSchema).query(async ({ input }) => {
    return getReportbuilderAudienceById(input.id);
  }),
  createReportbuilderAudience: publicProcedure
    .input(insertReportbuilderAudienceParams)
    .mutation(async ({ input }) => {
      return createReportbuilderAudience(input);
    }),
  updateReportbuilderAudience: publicProcedure
    .input(updateReportbuilderAudienceParams)
    .mutation(async ({ input }) => {
      return updateReportbuilderAudience(input.id, input);
    }),
  deleteReportbuilderAudience: publicProcedure
    .input(reportbuilderAudienceIdSchema)
    .mutation(async ({ input }) => {
      return deleteReportbuilderAudience(input.id);
    }),
});
