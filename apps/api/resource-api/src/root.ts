import { createTRPCRouter } from "./trpc";

import { resourceOldsRouter } from './routers/resourceOlds';
import { resourcesRouter } from './routers/resources';

export const appRouter = createTRPCRouter({
  resourceOlds: resourceOldsRouter,
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
