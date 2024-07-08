import { createTRPCRouter } from "./trpc";

import { modulesRouter } from './routers/modules';

export const appRouter = createTRPCRouter({
  modules: modulesRouter,
});

export type AppRouter = typeof appRouter;
