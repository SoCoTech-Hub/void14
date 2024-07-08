import { createTRPCRouter } from "./trpc";

import { mediasRouter } from './routers/medias';

export const appRouter = createTRPCRouter({
  medias: mediasRouter,
});

export type AppRouter = typeof appRouter;
