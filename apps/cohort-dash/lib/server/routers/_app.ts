import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { cohortsRouter } from "./cohorts";
import { cohortMembersRouter } from "./cohortMembers";

export const appRouter = router({
  computers: computersRouter,
  cohorts: cohortsRouter,
  cohortMembers: cohortMembersRouter,
});

export type AppRouter = typeof appRouter;
