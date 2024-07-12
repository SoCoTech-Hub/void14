import { cohortMembersRouter } from "./routers/cohortMembers";
import { cohortsRouter } from "./routers/cohorts";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  cohortMembers: cohortMembersRouter,
  cohorts: cohortsRouter,
});

export type AppRouter = typeof appRouter;
