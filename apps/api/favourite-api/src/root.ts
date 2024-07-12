import { favouritesRouter } from "./routers/favourites";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  favourites: favouritesRouter,
});

export type AppRouter = typeof appRouter;
