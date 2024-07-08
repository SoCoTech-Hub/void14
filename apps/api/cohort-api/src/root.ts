import { createTRPCRouter } from "./trpc";

import { cohortMembersRouter } from './routers/cohortMembers';
import { cohortsRouter } from './routers/cohorts';

export const appRouter = createTRPCRouter({
  cohortMembers: cohortMembersRouter,
  cohorts: cohortsRouter,
});

export type AppRouter = typeof appRouter;
