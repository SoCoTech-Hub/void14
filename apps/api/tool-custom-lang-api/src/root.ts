import { toolCustomLangComponentsRouter } from "./routers/toolCustomLangComponents";
import { toolCustomLangsRouter } from "./routers/toolCustomLangs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  toolCustomLangComponents: toolCustomLangComponentsRouter,
  toolCustomLangs: toolCustomLangsRouter,
});

export type AppRouter = typeof appRouter;
