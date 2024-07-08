import { createTRPCRouter } from "./trpc";

import { universitiesRouter } from './routers/universities';

export const appRouter = createTRPCRouter({
  universities: universitiesRouter,
});

export type AppRouter = typeof appRouter;
