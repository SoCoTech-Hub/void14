import { router } from "../server/trpc";
import { toolCustomLangComponentsRouter } from "./toolCustomLangComponents";
import { toolCustomLangsRouter } from "./toolCustomLangs";

export const appRouter = router({
  toolCustomLangs: toolCustomLangsRouter,
  toolCustomLangComponents: toolCustomLangComponentsRouter,
});

export type AppRouter = typeof appRouter;
