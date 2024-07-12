import { resourceOldsRouter } from "./routers/resourceOlds";
import { resourcesRouter } from "./routers/resources";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  resourceOlds: resourceOldsRouter,
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
