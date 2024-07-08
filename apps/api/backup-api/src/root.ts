import { createTRPCRouter } from "./trpc";

import { backupControllersRouter } from './routers/backupControllers';
import { backupCoursesRouter } from './routers/backupCourses';
import { backupLogsRouter } from './routers/backupLogs';

export const appRouter = createTRPCRouter({
  backupControllers: backupControllersRouter,
  backupCourses: backupCoursesRouter,
  backupLogs: backupLogsRouter,
});

export type AppRouter = typeof appRouter;
