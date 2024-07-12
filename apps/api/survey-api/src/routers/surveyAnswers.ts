import {
  insertSurveyAnswerParams,
  surveyAnswerIdSchema,
  updateSurveyAnswerParams,
} from "@soco/survey-db/schema/surveyAnswers";

import {
  createSurveyAnswer,
  deleteSurveyAnswer,
  updateSurveyAnswer,
} from "../api/surveyAnswers/mutations";
import {
  getSurveyAnswerById,
  getSurveyAnswers,
} from "../api/surveyAnswers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyAnswersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSurveyAnswers: publicProcedure.query(async () => {
      return getSurveyAnswers();
    }),
    getSurveyAnswerById: publicProcedure
      .input(surveyAnswerIdSchema)
      .query(async ({ input }) => {
        return getSurveyAnswerById(input.id);
      }),
    createSurveyAnswer: publicProcedure
      .input(insertSurveyAnswerParams)
      .mutation(async ({ input }) => {
        return createSurveyAnswer(input);
      }),
    updateSurveyAnswer: publicProcedure
      .input(updateSurveyAnswerParams)
      .mutation(async ({ input }) => {
        return updateSurveyAnswer(input.id, input);
      }),
    deleteSurveyAnswer: publicProcedure
      .input(surveyAnswerIdSchema)
      .mutation(async ({ input }) => {
        return deleteSurveyAnswer(input.id);
      }),
  });
