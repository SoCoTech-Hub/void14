import { logDisplaysRouter } from "./routers/logDisplays";
import { logQueriesRouter } from "./routers/logQueries";
import { logstoreStandardLogsRouter } from "./routers/logstoreStandardLogs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  logDisplays: logDisplaysRouter,
  logQueries: logQueriesRouter,
  logstoreStandardLogs: logstoreStandardLogsRouter,
});

export type AppRouter = typeof appRouter;
