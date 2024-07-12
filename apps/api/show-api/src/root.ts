import { showsRouter } from "./routers/shows";
import { showsCategoriesRouter } from "./routers/showsCategories";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  shows: showsRouter,
  showsCategories: showsCategoriesRouter,
});

export type AppRouter = typeof appRouter;
