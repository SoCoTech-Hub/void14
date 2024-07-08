import { getSurveyAnalysissById, getSurveyAnalysiss } from "../api/surveyAnalysiss/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  surveyAnalysissIdSchema,
  insertSurveyAnalysissParams,
  updateSurveyAnalysissParams,
} from "@soco/survey-db/schema/surveyAnalysiss";
import { createSurveyAnalysiss, deleteSurveyAnalysiss, updateSurveyAnalysiss } from "../api/surveyAnalysiss/mutations";

export const surveyAnalysissRouter =createTRPCRouter({
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
