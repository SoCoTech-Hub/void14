import { getSurveyQuestionById, getSurveyQuestions } from "@/lib/api/surveyQuestions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  surveyQuestionIdSchema,
  insertSurveyQuestionParams,
  updateSurveyQuestionParams,
} from "@/lib/db/schema/surveyQuestions";
import { createSurveyQuestion, deleteSurveyQuestion, updateSurveyQuestion } from "@/lib/api/surveyQuestions/mutations";

export const surveyQuestionsRouter = router({
  getSurveyQuestions: publicProcedure.query(async () => {
    return getSurveyQuestions();
  }),
  getSurveyQuestionById: publicProcedure.input(surveyQuestionIdSchema).query(async ({ input }) => {
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
