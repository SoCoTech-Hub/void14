import { createTRPCRouter } from "./trpc";

import { choiceAnswersRouter } from './routers/choiceAnswers';
import { choiceOptionsRouter } from './routers/choiceOptions';
import { choicesRouter } from './routers/choices';

export const appRouter = createTRPCRouter({
  choiceAnswers: choiceAnswersRouter,
  choiceOptions: choiceOptionsRouter,
  choices: choicesRouter,
});

export type AppRouter = typeof appRouter;
