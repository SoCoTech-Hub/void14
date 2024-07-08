import { createTRPCRouter } from "./trpc";

import { labelsRouter } from './routers/labels';

export const appRouter = createTRPCRouter({
  labels: labelsRouter,
});

export type AppRouter = typeof appRouter;
