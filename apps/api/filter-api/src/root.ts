import { filterActivesRouter } from "./routers/filterActives";
import { filterConfigsRouter } from "./routers/filterConfigs";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  filterActives: filterActivesRouter,
  filterConfigs: filterConfigsRouter,
});

export type AppRouter = typeof appRouter;
