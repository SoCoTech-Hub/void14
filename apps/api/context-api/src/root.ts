import { createTRPCRouter } from "./trpc";

import { contextsRouter } from './routers/contexts';
import { contextTempRouter } from './routers/contextTemp';

export const appRouter = createTRPCRouter({
  contexts: contextsRouter,
  contextTemp: contextTempRouter,
});

export type AppRouter = typeof appRouter;
