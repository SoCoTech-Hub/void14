import { modulesRouter } from "./routers/modules";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  modules: modulesRouter,
});

export type AppRouter = typeof appRouter;
