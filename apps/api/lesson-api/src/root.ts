import { createTRPCRouter } from "./trpc";

import { lessonAnswersRouter } from './routers/lessonAnswers';
import { lessonAttemptsRouter } from './routers/lessonAttempts';
import { lessonBranchesRouter } from './routers/lessonBranches';
import { lessonGradesRouter } from './routers/lessonGrades';
import { lessonOverridesRouter } from './routers/lessonOverrides';
import { lessonPagesRouter } from './routers/lessonPages';
import { lessonsRouter } from './routers/lessons';
import { lessonTimerRouter } from './routers/lessonTimer';

export const appRouter = createTRPCRouter({
  lessonAnswers: lessonAnswersRouter,
  lessonAttempts: lessonAttemptsRouter,
  lessonBranches: lessonBranchesRouter,
  lessonGrades: lessonGradesRouter,
  lessonOverrides: lessonOverridesRouter,
  lessonPages: lessonPagesRouter,
  lessons: lessonsRouter,
  lessonTimer: lessonTimerRouter,
});

export type AppRouter = typeof appRouter;
