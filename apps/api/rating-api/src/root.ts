import { ratingsRouter } from "./routers/ratings";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  ratings: ratingsRouter,
});

export type AppRouter = typeof appRouter;
