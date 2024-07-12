import { configLogsRouter } from "./routers/configLogs";
import { configPluginsRouter } from "./routers/configPlugins";
import { configsRouter } from "./routers/configs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  configLogs: configLogsRouter,
  configPlugins: configPluginsRouter,
  configs: configsRouter,
});

export type AppRouter = typeof appRouter;
