import { urlsRouter } from "./routers/urls";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  urls: urlsRouter,
});

export type AppRouter = typeof appRouter;
