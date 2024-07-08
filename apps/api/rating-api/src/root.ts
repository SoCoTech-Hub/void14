import { createTRPCRouter } from "./trpc";

import { ratingsRouter } from './routers/ratings';

export const appRouter = createTRPCRouter({
  ratings: ratingsRouter,
});

export type AppRouter = typeof appRouter;
