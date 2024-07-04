import {
  createSurveyAnalysiss,
  deleteSurveyAnalysiss,
  updateSurveyAnalysiss,
} from "../api/surveyAnalysiss/mutations";
import {
  getSurveyAnalysiss,
  getSurveyAnalysissById,
} from "../api/surveyAnalysiss/queries";
import {
  insertSurveyAnalysissParams,
  surveyAnalysissIdSchema,
  updateSurveyAnalysissParams,
} from "../db/schema/surveyAnalysiss";
import { publicProcedure, router } from "../server/trpc";

export const surveyAnalysissRouter = router({
  getSurveyAnalysiss: publicProcedure.query(async () => {
    return getSurveyAnalysiss();
  }),
  getSurveyAnalysissById: publicProcedure
    .input(surveyAnalysissIdSchema)
    .query(async ({ input }) => {
      return getSurveyAnalysissById(input.id);
    }),
  createSurveyAnalysiss: publicProcedure
    .input(insertSurveyAnalysissParams)
    .mutation(async ({ input }) => {
      return createSurveyAnalysiss(input);
    }),
  updateSurveyAnalysiss: publicProcedure
    .input(updateSurveyAnalysissParams)
    .mutation(async ({ input }) => {
      return updateSurveyAnalysiss(input.id, input);
    }),
  deleteSurveyAnalysiss: publicProcedure
    .input(surveyAnalysissIdSchema)
    .mutation(async ({ input }) => {
      return deleteSurveyAnalysiss(input.id);
    }),
});
