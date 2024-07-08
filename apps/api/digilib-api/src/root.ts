import { createTRPCRouter } from "./trpc";

import { digilibCategoriesRouter } from './routers/digilibCategories';
import { digilibsRouter } from './routers/digilibs';

export const appRouter = createTRPCRouter({
  digilibCategories: digilibCategoriesRouter,
  digilibs: digilibsRouter,
});

export type AppRouter = typeof appRouter;
