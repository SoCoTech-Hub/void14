import { createTRPCRouter } from "./trpc";

import { editorAttoAutosavesRouter } from './routers/editorAttoAutosaves';

export const appRouter = createTRPCRouter({
  editorAttoAutosaves: editorAttoAutosavesRouter,
});

export type AppRouter = typeof appRouter;
