import { createTRPCRouter } from "./trpc";

import { stickersRouter } from './routers/stickers';

export const appRouter = createTRPCRouter({
  stickers: stickersRouter,
});

export type AppRouter = typeof appRouter;
