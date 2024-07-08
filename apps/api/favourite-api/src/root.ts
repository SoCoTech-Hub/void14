import { createTRPCRouter } from "./trpc";

import { favouritesRouter } from './routers/favourites';

export const appRouter = createTRPCRouter({
  favourites: favouritesRouter,
});

export type AppRouter = typeof appRouter;
