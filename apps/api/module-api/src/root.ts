import { modulesRouter } from "./routers/modules";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  modules: modulesRouter,
});

export type AppRouter = typeof appRouter;
