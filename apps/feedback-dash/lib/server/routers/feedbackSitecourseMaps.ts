import { getFeedbackSitecourseMapById, getFeedbackSitecourseMaps } from "@/lib/api/feedbackSitecourseMaps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedbackSitecourseMapIdSchema,
  insertFeedbackSitecourseMapParams,
  updateFeedbackSitecourseMapParams,
} from "@/lib/db/schema/feedbackSitecourseMaps";
import { createFeedbackSitecourseMap, deleteFeedbackSitecourseMap, updateFeedbackSitecourseMap } from "@/lib/api/feedbackSitecourseMaps/mutations";

export const feedbackSitecourseMapsRouter = router({
  getFeedbackSitecourseMaps: publicProcedure.query(async () => {
    return getFeedbackSitecourseMaps();
  }),
  getFeedbackSitecourseMapById: publicProcedure.input(feedbackSitecourseMapIdSchema).query(async ({ input }) => {
    return getFeedbackSitecourseMapById(input.id);
  }),
  createFeedbackSitecourseMap: publicProcedure
    .input(insertFeedbackSitecourseMapParams)
    .mutation(async ({ input }) => {
      return createFeedbackSitecourseMap(input);
    }),
  updateFeedbackSitecourseMap: publicProcedure
    .input(updateFeedbackSitecourseMapParams)
    .mutation(async ({ input }) => {
      return updateFeedbackSitecourseMap(input.id, input);
    }),
  deleteFeedbackSitecourseMap: publicProcedure
    .input(feedbackSitecourseMapIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeedbackSitecourseMap(input.id);
    }),
});
