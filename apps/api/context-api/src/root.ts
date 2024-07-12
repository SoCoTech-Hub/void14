import { contextsRouter } from "./routers/contexts";
import { contextTempRouter } from "./routers/contextTemp";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  contexts: contextsRouter,
  contextTemp: contextTempRouter,
});

export type AppRouter = typeof appRouter;
