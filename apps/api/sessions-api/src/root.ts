import { sessionsRouter } from './routers/sessions';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  sessions: sessionsRouter,
});

export type AppRouter = typeof appRouter;
