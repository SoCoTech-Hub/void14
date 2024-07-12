import { toolCohortRolesRouter } from "./routers/toolCohortRoles";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  toolCohortRoles: toolCohortRolesRouter,
});

export type AppRouter = typeof appRouter;
