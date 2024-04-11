import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { forumsRouter } from "./forums";

export const appRouter = router({
  computers: computersRouter,
  forums: forumsRouter,
});

export type AppRouter = typeof appRouter;
