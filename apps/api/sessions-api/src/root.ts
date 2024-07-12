import { sessionsRouter } from "./routers/sessions";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  sessions: sessionsRouter,
});

export type AppRouter = typeof appRouter;
