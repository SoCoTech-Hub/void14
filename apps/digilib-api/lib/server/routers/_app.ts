import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { digilibCategoriesRouter } from "./digilibCategories";
import { digilibsRouter } from "./digilibs";


export const appRouter = router({
  computers: computersRouter,
  digilibCategories: digilibCategoriesRouter,
  digilibs: digilibsRouter,
});

export type AppRouter = typeof appRouter;
