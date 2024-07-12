import {
  insertSurveyQuestionParams,
  surveyQuestionIdSchema,
  updateSurveyQuestionParams,
} from "@soco/survey-db/schema/surveyQuestions";

import {
  createSurveyQuestion,
  deleteSurveyQuestion,
  updateSurveyQuestion,
} from "../api/surveyQuestions/mutations";
import {
  getSurveyQuestionById,
  getSurveyQuestions,
} from "../api/surveyQuestions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyQuestionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSurveyQuestions: publicProcedure.query(async () => {
      return getSurveyQuestions();
    }),
    getSurveyQuestionById: publicProcedure
      .input(surveyQuestionIdSchema)
      .query(async ({ input }) => {
        return getSurveyQuestionById(input.id);
      }),
    createSurveyQuestion: publicProcedure
      .input(insertSurveyQuestionParams)
      .mutation(async ({ input }) => {
        return createSurveyQuestion(input);
      }),
    updateSurveyQuestion: publicProcedure
      .input(updateSurveyQuestionParams)
      .mutation(async ({ input }) => {
        return updateSurveyQuestion(input.id, input);
      }),
    deleteSurveyQuestion: publicProcedure
      .input(surveyQuestionIdSchema)
      .mutation(async ({ input }) => {
        return deleteSurveyQuestion(input.id);
      }),
  });
