import { createTRPCRouter } from "./trpc";

import { showsRouter } from './routers/shows';
import { showsCategoriesRouter } from './routers/showsCategories';

export const appRouter = createTRPCRouter({
  shows: showsRouter,
  showsCategories: showsCategoriesRouter,
});

export type AppRouter = typeof appRouter;
