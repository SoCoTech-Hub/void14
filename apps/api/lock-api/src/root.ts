import { createTRPCRouter } from "./trpc";

import { lockDbsRouter } from './routers/lockDbs';

export const appRouter = createTRPCRouter({
  lockDbs: lockDbsRouter,
});

export type AppRouter = typeof appRouter;
