import {
  createSurveyQuestion,
  deleteSurveyQuestion,
  updateSurveyQuestion,
} from "../api/surveyQuestions/mutations";
import {
  getSurveyQuestionById,
  getSurveyQuestions,
} from "../api/surveyQuestions/queries";
import {
  insertSurveyQuestionParams,
  surveyQuestionIdSchema,
  updateSurveyQuestionParams,
} from "../db/schema/surveyQuestions";
import { publicProcedure, router } from "../server/trpc";

export const surveyQuestionsRouter = router({
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
