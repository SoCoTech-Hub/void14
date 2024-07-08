import { getFeedbackSitecourseMapById, getFeedbackSitecourseMaps } from "../api/feedbackSitecourseMaps/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  feedbackSitecourseMapIdSchema,
  insertFeedbackSitecourseMapParams,
  updateFeedbackSitecourseMapParams,
} from "@soco/feedback-db/schema/feedbackSitecourseMaps";
import { createFeedbackSitecourseMap, deleteFeedbackSitecourseMap, updateFeedbackSitecourseMap } from "../api/feedbackSitecourseMaps/mutations";

export const feedbackSitecourseMapsRouter =createTRPCRouter({
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
