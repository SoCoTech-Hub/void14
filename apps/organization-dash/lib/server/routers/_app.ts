import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { organizationsRouter } from "./organizations";

export const appRouter = router({
  computers: computersRouter,
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
