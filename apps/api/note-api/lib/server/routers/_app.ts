import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { notesRouter } from "./notes";

export const appRouter = router({
  computers: computersRouter,
  notes: notesRouter,
});

export type AppRouter = typeof appRouter;
