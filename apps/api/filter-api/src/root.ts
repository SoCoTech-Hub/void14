import { filterActivesRouter } from "./routers/filterActives";
import { filterConfigsRouter } from "./routers/filterConfigs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  filterActives: filterActivesRouter,
  filterConfigs: filterConfigsRouter,
});

export type AppRouter = typeof appRouter;
