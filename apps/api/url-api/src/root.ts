import { urlsRouter } from './routers/urls';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  urls: urlsRouter,
});

export type AppRouter = typeof appRouter;
