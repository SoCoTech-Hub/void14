import { favouritesRouter } from "./routers/favourites";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  favourites: favouritesRouter,
});

export type AppRouter = typeof appRouter;
