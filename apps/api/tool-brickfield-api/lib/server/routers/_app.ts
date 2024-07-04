import { router } from "../server/trpc";
import { toolCohortRolesRouter } from "./toolCohortRoles";

export const appRouter = router({
  toolCohortRoles: toolCohortRolesRouter,
});

export type AppRouter = typeof appRouter;
