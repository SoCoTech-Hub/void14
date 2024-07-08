import { createTRPCRouter } from "./trpc";

import { surveyAnalysissRouter } from './routers/surveyAnalysiss';
import { surveyAnswersRouter } from './routers/surveyAnswers';
import { surveyQuestionsRouter } from './routers/surveyQuestions';
import { surveysRouter } from './routers/surveys';

export const appRouter = createTRPCRouter({
  surveyAnalysiss: surveyAnalysissRouter,
  surveyAnswers: surveyAnswersRouter,
  surveyQuestions: surveyQuestionsRouter,
  surveys: surveysRouter,
});

export type AppRouter = typeof appRouter;
