import { taskAdhocsRouter } from "./routers/taskAdhocs";
import { taskLogsRouter } from "./routers/taskLogs";
import { taskSchedulesRouter } from "./routers/taskSchedules";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  taskAdhocs: taskAdhocsRouter,
  taskLogs: taskLogsRouter,
  taskSchedules: taskSchedulesRouter,
});

export type AppRouter = typeof appRouter;
