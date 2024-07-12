import { universitiesRouter } from "./routers/universities";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  universities: universitiesRouter,
});

export type AppRouter = typeof appRouter;
