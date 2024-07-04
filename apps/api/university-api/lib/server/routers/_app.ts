import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { universitiesRouter } from "./universities";

export const appRouter = router({
  computers: computersRouter,
  universities: universitiesRouter,
});

export type AppRouter = typeof appRouter;
