import { createTRPCRouter } from "./trpc";

import { toolMonitorEventsRouter } from './routers/toolMonitorEvents';
import { toolMonitorHistoriesRouter } from './routers/toolMonitorHistories';
import { toolMonitorRulesRouter } from './routers/toolMonitorRules';
import { toolMonitorSubscriptionsRouter } from './routers/toolMonitorSubscriptions';

export const appRouter = createTRPCRouter({
  toolMonitorEvents: toolMonitorEventsRouter,
  toolMonitorHistories: toolMonitorHistoriesRouter,
  toolMonitorRules: toolMonitorRulesRouter,
  toolMonitorSubscriptions: toolMonitorSubscriptionsRouter,
});

export type AppRouter = typeof appRouter;
