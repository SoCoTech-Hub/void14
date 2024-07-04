import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { notesRouter } from "./notes";

export const appRouter = router({
  computers: computersRouter,
  notes: notesRouter,
});

export type AppRouter = typeof appRouter;
