import { contentsRouter } from "./routers/contents";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  contents: contentsRouter,
});

export type AppRouter = typeof appRouter;
