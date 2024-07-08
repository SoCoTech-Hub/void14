import { createTRPCRouter } from "./trpc";

import { pagesRouter } from './routers/pages';

export const appRouter = createTRPCRouter({
  pages: pagesRouter,
});

export type AppRouter = typeof appRouter;
