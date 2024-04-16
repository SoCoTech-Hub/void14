import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { showsCategoriesRouter } from "./showsCategories";
import { showsRouter } from "./shows";

export const appRouter = router({
  computers: computersRouter,
  showsCategories: showsCategoriesRouter,
  shows: showsRouter,
});

export type AppRouter = typeof appRouter;
