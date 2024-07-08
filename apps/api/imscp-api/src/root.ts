import { createTRPCRouter } from "./trpc";

import { imscpsRouter } from './routers/imscps';

export const appRouter = createTRPCRouter({
  imscps: imscpsRouter,
});

export type AppRouter = typeof appRouter;
