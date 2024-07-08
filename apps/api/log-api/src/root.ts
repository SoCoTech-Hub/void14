import { createTRPCRouter } from "./trpc";

import { logDisplaysRouter } from './routers/logDisplays';
import { logQueriesRouter } from './routers/logQueries';
import { logstoreStandardLogsRouter } from './routers/logstoreStandardLogs';

export const appRouter = createTRPCRouter({
  logDisplays: logDisplaysRouter,
  logQueries: logQueriesRouter,
  logstoreStandardLogs: logstoreStandardLogsRouter,
});

export type AppRouter = typeof appRouter;
