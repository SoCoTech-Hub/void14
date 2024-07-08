import { createTRPCRouter } from "./trpc";

import { urlsRouter } from './routers/urls';

export const appRouter = createTRPCRouter({
  urls: urlsRouter,
});

export type AppRouter = typeof appRouter;
