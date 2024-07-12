import { notesRouter } from "./routers/notes";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  notes: notesRouter,
});

export type AppRouter = typeof appRouter;
