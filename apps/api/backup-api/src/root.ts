import { backupControllersRouter } from "./routers/backupControllers";
import { backupCoursesRouter } from "./routers/backupCourses";
import { backupLogsRouter } from "./routers/backupLogs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  backupControllers: backupControllersRouter,
  backupCourses: backupCoursesRouter,
  backupLogs: backupLogsRouter,
});

export type AppRouter = typeof appRouter;
