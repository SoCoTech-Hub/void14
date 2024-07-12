import {
  insertSurveyParams,
  surveyIdSchema,
  updateSurveyParams,
} from "@soco/survey-db/schema/surveys";

import {
  createSurvey,
  deleteSurvey,
  updateSurvey,
} from "../api/surveys/mutations";
import { getSurveyById, getSurveys } from "../api/surveys/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveysRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSurveys: publicProcedure.query(async () => {
      return getSurveys();
    }),
    getSurveyById: publicProcedure
      .input(surveyIdSchema)
      .query(async ({ input }) => {
        return getSurveyById(input.id);
      }),
    createSurvey: publicProcedure
      .input(insertSurveyParams)
      .mutation(async ({ input }) => {
        return createSurvey(input);
      }),
    updateSurvey: publicProcedure
      .input(updateSurveyParams)
      .mutation(async ({ input }) => {
        return updateSurvey(input.id, input);
      }),
    deleteSurvey: publicProcedure
      .input(surveyIdSchema)
      .mutation(async ({ input }) => {
        return deleteSurvey(input.id);
      }),
  });
