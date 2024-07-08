import { createTRPCRouter } from "./trpc";

import { subjectCategoriesRouter } from './routers/subjectCategories';
import { subjectsRouter } from './routers/subjects';
import { subjectsSubjectCategoriesRouter } from './routers/subjectsSubjectCategories';

export const appRouter = createTRPCRouter({
  subjectCategories: subjectCategoriesRouter,
  subjects: subjectsRouter,
  subjectsSubjectCategories: subjectsSubjectCategoriesRouter,
});

export type AppRouter = typeof appRouter;
