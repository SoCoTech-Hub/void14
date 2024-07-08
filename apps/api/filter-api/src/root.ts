import { createTRPCRouter } from "./trpc";

import { filterActivesRouter } from './routers/filterActives';
import { filterConfigsRouter } from './routers/filterConfigs';

export const appRouter = createTRPCRouter({
  filterActives: filterActivesRouter,
  filterConfigs: filterConfigsRouter,
});

export type AppRouter = typeof appRouter;
