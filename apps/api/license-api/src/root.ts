import { createTRPCRouter } from "./trpc";

import { licensesRouter } from './routers/licenses';

export const appRouter = createTRPCRouter({
  licenses: licensesRouter,
});

export type AppRouter = typeof appRouter;
