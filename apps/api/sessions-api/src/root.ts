import { createTRPCRouter } from "./trpc";

import { sessionsRouter } from './routers/sessions';

export const appRouter = createTRPCRouter({
  sessions: sessionsRouter,
});

export type AppRouter = typeof appRouter;
