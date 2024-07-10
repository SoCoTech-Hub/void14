import { toolCustomLangComponentsRouter } from './routers/toolCustomLangComponents';
import { toolCustomLangsRouter } from './routers/toolCustomLangs';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  toolCustomLangComponents: toolCustomLangComponentsRouter,
  toolCustomLangs: toolCustomLangsRouter,
});

export type AppRouter = typeof appRouter;
