import { choiceAnswersRouter } from "./routers/choiceAnswers";
import { choiceOptionsRouter } from "./routers/choiceOptions";
import { choicesRouter } from "./routers/choices";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  choiceAnswers: choiceAnswersRouter,
  choiceOptions: choiceOptionsRouter,
  choices: choicesRouter,
});

export type AppRouter = typeof appRouter;
