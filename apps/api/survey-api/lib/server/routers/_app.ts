import { router } from "../server/trpc";
import { surveyAnalysissRouter } from "./surveyAnalysiss";
import { surveyAnswersRouter } from "./surveyAnswers";
import { surveyQuestionsRouter } from "./surveyQuestions";
import { surveysRouter } from "./surveys";

export const appRouter = router({
  surveys: surveysRouter,
  surveyAnalysiss: surveyAnalysissRouter,
  surveyAnswers: surveyAnswersRouter,
  surveyQuestions: surveyQuestionsRouter,
});

export type AppRouter = typeof appRouter;
