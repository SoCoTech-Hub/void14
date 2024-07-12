import { lockDbsRouter } from "./routers/lockDbs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  lockDbs: lockDbsRouter,
});

export type AppRouter = typeof appRouter;
