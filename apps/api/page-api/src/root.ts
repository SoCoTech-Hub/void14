import { pagesRouter } from "./routers/pages";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  pages: pagesRouter,
});

export type AppRouter = typeof appRouter;
