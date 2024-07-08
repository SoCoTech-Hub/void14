import { createTRPCRouter } from "./trpc";

import { toolRecyclebinCategoriesRouter } from './routers/toolRecyclebinCategories';
import { toolRecyclebinCoursesRouter } from './routers/toolRecyclebinCourses';

export const appRouter = createTRPCRouter({
  toolRecyclebinCategories: toolRecyclebinCategoriesRouter,
  toolRecyclebinCourses: toolRecyclebinCoursesRouter,
});

export type AppRouter = typeof appRouter;
