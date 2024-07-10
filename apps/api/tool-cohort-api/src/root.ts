import { toolCohortRolesRouter } from './routers/toolCohortRoles';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  toolCohortRoles: toolCohortRolesRouter,
});

export type AppRouter = typeof appRouter;
