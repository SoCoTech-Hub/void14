import { createTRPCRouter } from "./trpc";

import { organizationsRouter } from './routers/organizations';

export const appRouter = createTRPCRouter({
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
