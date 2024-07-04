import { router } from "../server/trpc";
import { choiceAnswersRouter } from "./choiceAnswers";
import { choiceOptionsRouter } from "./choiceOptions";
import { choicesRouter } from "./choices";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  choices: choicesRouter,
  choiceOptions: choiceOptionsRouter,
  choiceAnswers: choiceAnswersRouter,
});

export type AppRouter = typeof appRouter;
