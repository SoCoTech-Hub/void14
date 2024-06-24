import { getReportbuilderAudienceById, getReportbuilderAudiences } from "@/lib/api/reportbuilderAudiences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  reportbuilderAudienceIdSchema,
  insertReportbuilderAudienceParams,
  updateReportbuilderAudienceParams,
} from "@/lib/db/schema/reportbuilderAudiences";
import { createReportbuilderAudience, deleteReportbuilderAudience, updateReportbuilderAudience } from "@/lib/api/reportbuilderAudiences/mutations";

export const reportbuilderAudiencesRouter = router({
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
