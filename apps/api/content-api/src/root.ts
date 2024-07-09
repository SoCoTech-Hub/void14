import { contentsRouter } from "./routers/contents";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  contents: contentsRouter,
});

export type AppRouter = typeof appRouter;
