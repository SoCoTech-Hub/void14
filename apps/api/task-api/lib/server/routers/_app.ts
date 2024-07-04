import { router } from "../server/trpc";
import { taskAdhocsRouter } from "./taskAdhocs";
import { taskLogsRouter } from "./taskLogs";
import { taskSchedulesRouter } from "./taskSchedules";

export const appRouter = router({
  taskLogs: taskLogsRouter,
  taskSchedules: taskSchedulesRouter,
  taskAdhocs: taskAdhocsRouter,
});

export type AppRouter = typeof appRouter;
