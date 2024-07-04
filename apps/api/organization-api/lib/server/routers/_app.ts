import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { organizationsRouter } from "./organizations";

export const appRouter = router({
  computers: computersRouter,
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
