import { router } from "../server/trpc";
import { cohortMembersRouter } from "./cohortMembers";
import { cohortsRouter } from "./cohorts";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  cohorts: cohortsRouter,
  cohortMembers: cohortMembersRouter,
});

export type AppRouter = typeof appRouter;
