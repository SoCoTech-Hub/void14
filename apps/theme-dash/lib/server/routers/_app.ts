import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { themesRouter } from "./themes";

export const appRouter = router({
  computers: computersRouter,
  themes: themesRouter,
});

export type AppRouter = typeof appRouter;
