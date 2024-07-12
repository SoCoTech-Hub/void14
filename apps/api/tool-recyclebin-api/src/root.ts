import { toolRecyclebinCategoriesRouter } from "./routers/toolRecyclebinCategories";
import { toolRecyclebinCoursesRouter } from "./routers/toolRecyclebinCourses";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  toolRecyclebinCategories: toolRecyclebinCategoriesRouter,
  toolRecyclebinCourses: toolRecyclebinCoursesRouter,
});

export type AppRouter = typeof appRouter;
