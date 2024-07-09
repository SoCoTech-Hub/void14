import { createTRPCRouter } from "./trpc";

import { configLogsRouter } from './routers/configLogs';
import { configPluginsRouter } from './routers/configPlugins';
import { configsRouter } from './routers/configs';

export const appRouter = createTRPCRouter({
  configLogs: configLogsRouter,
  configPlugins: configPluginsRouter,
  configs: configsRouter,
});

export type AppRouter = typeof appRouter;