import { createTRPCRouter } from "./trpc";

import { commentsRouter } from './routers/comments';

export const appRouter = createTRPCRouter({
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
