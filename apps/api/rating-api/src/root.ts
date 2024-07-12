import { ratingsRouter } from "./routers/ratings";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  ratings: ratingsRouter,
});

export type AppRouter = typeof appRouter;
