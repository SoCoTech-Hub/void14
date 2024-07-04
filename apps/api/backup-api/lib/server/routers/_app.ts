import { router } from "../server/trpc";
import { backupControllersRouter } from "./backupControllers";
import { backupCoursesRouter } from "./backupCourses";
import { backupLogsRouter } from "./backupLogs";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  backupControllers: backupControllersRouter,
  backupCourses: backupCoursesRouter,
  backupLogs: backupLogsRouter,
});

export type AppRouter = typeof appRouter;
