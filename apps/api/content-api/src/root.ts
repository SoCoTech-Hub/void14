import { createTRPCRouter } from "./trpc";

import { contentsRouter } from './routers/contents';

export const appRouter = createTRPCRouter({
  contents: contentsRouter,
});

export type AppRouter = typeof appRouter;
