import { universitiesRouter } from "./routers/universities";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  universities: universitiesRouter,
});

export type AppRouter = typeof appRouter;
