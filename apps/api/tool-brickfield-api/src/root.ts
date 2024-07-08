import { createTRPCRouter } from "./trpc";

import { toolCohortRolesRouter } from './routers/toolCohortRoles';

export const appRouter = createTRPCRouter({
  toolCohortRoles: toolCohortRolesRouter,
});

export type AppRouter = typeof appRouter;
