import { createTRPCRouter } from "./trpc";

import { toolCustomLangComponentsRouter } from './routers/toolCustomLangComponents';
import { toolCustomLangsRouter } from './routers/toolCustomLangs';

export const appRouter = createTRPCRouter({
  toolCustomLangComponents: toolCustomLangComponentsRouter,
  toolCustomLangs: toolCustomLangsRouter,
});

export type AppRouter = typeof appRouter;
