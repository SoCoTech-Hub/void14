import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { choicesRouter } from "./choices";
import { choiceOptionsRouter } from "./choiceOptions";
import { choiceAnswersRouter } from "./choiceAnswers";

export const appRouter = router({
  computers: computersRouter,
  choices: choicesRouter,
  choiceOptions: choiceOptionsRouter,
  choiceAnswers: choiceAnswersRouter,
});

export type AppRouter = typeof appRouter;
