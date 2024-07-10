import { editorAttoAutosavesRouter } from './routers/editorAttoAutosaves';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  editorAttoAutosaves: editorAttoAutosavesRouter,
});

export type AppRouter = typeof appRouter;
