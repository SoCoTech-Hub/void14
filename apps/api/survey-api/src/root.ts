import { surveyAnalysissRouter } from './routers/surveyAnalysiss';
import { surveyAnswersRouter } from './routers/surveyAnswers';
import { surveyQuestionsRouter } from './routers/surveyQuestions';
import { surveysRouter } from './routers/surveys';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  surveyAnalysiss: surveyAnalysissRouter,
  surveyAnswers: surveyAnswersRouter,
  surveyQuestions: surveyQuestionsRouter,
  surveys: surveysRouter,
});

export type AppRouter = typeof appRouter;
