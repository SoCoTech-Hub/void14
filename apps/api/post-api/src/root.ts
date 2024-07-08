import { createTRPCRouter } from "./trpc";

import { postsRouter } from './routers/posts';

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
