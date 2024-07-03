import { getSurveyAnalysissById, getSurveyAnalysiss } from "@/lib/api/surveyAnalysiss/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  surveyAnalysissIdSchema,
  insertSurveyAnalysissParams,
  updateSurveyAnalysissParams,
} from "@/lib/db/schema/surveyAnalysiss";
import { createSurveyAnalysiss, deleteSurveyAnalysiss, updateSurveyAnalysiss } from "@/lib/api/surveyAnalysiss/mutations";

export const surveyAnalysissRouter = router({
  getSurveyAnalysiss: publicProcedure.query(async () => {
    return getSurveyAnalysiss();
  }),
  getSurveyAnalysissById: publicProcedure.input(surveyAnalysissIdSchema).query(async ({ input }) => {
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
