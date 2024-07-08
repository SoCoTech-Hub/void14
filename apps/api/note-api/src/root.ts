import { createTRPCRouter } from "./trpc";

import { notesRouter } from './routers/notes';

export const appRouter = createTRPCRouter({
  notes: notesRouter,
});

export type AppRouter = typeof appRouter;
