import { getSurveyAnswerById, getSurveyAnswers } from "@/lib/api/surveyAnswers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  surveyAnswerIdSchema,
  insertSurveyAnswerParams,
  updateSurveyAnswerParams,
} from "@/lib/db/schema/surveyAnswers";
import { createSurveyAnswer, deleteSurveyAnswer, updateSurveyAnswer } from "@/lib/api/surveyAnswers/mutations";

export const surveyAnswersRouter = router({
  getSurveyAnswers: publicProcedure.query(async () => {
    return getSurveyAnswers();
  }),
  getSurveyAnswerById: publicProcedure.input(surveyAnswerIdSchema).query(async ({ input }) => {
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
