import { digilibCategoriesRouter } from "./routers/digilibCategories";
import { digilibsRouter } from "./routers/digilibs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  digilibCategories: digilibCategoriesRouter,
  digilibs: digilibsRouter,
});

export type AppRouter = typeof appRouter;
