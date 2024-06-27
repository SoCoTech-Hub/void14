import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { universitiesRouter } from "./universities";

export const appRouter = router({
  computers: computersRouter,
  universities: universitiesRouter,
});

export type AppRouter = typeof appRouter;
