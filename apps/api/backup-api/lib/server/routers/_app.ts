import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { backupControllersRouter } from "./backupControllers";
import { backupCoursesRouter } from "./backupCourses";
import { backupLogsRouter } from "./backupLogs";

export const appRouter = router({
  computers: computersRouter,
  backupControllers: backupControllersRouter,
  backupCourses: backupCoursesRouter,
  backupLogs: backupLogsRouter,
});

export type AppRouter = typeof appRouter;
