import { contextsRouter } from "./routers/contexts";
import { contextTempRouter } from "./routers/contextTemp";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  contexts: contextsRouter,
  contextTemp: contextTempRouter,
});

export type AppRouter = typeof appRouter;
