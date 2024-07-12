import {
  insertReportbuilderAudienceParams,
  reportbuilderAudienceIdSchema,
  updateReportbuilderAudienceParams,
} from "@soco/report-builder-db/schema/reportbuilderAudiences";

import {
  createReportbuilderAudience,
  deleteReportbuilderAudience,
  updateReportbuilderAudience,
} from "../api/reportbuilderAudiences/mutations";
import {
  getReportbuilderAudienceById,
  getReportbuilderAudiences,
} from "../api/reportbuilderAudiences/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const reportbuilderAudiencesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getReportbuilderAudiences: publicProcedure.query(async () => {
      return getReportbuilderAudiences();
    }),
    getReportbuilderAudienceById: publicProcedure
      .input(reportbuilderAudienceIdSchema)
      .query(async ({ input }) => {
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
