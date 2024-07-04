import {
  createSurveyAnswer,
  deleteSurveyAnswer,
  updateSurveyAnswer,
} from "../api/surveyAnswers/mutations";
import {
  getSurveyAnswerById,
  getSurveyAnswers,
} from "../api/surveyAnswers/queries";
import {
  insertSurveyAnswerParams,
  surveyAnswerIdSchema,
  updateSurveyAnswerParams,
} from "../db/schema/surveyAnswers";
import { publicProcedure, router } from "../server/trpc";

export const surveyAnswersRouter = router({
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
