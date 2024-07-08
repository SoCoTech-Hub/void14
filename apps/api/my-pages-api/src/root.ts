import { createTRPCRouter } from "./trpc";

import { myPagesRouter } from './routers/myPages';

export const appRouter = createTRPCRouter({
  myPages: myPagesRouter,
});

export type AppRouter = typeof appRouter;
