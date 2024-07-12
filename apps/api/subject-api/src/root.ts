import { subjectCategoriesRouter } from "./routers/subjectCategories";
import { subjectsRouter } from "./routers/subjects";
import { subjectsSubjectCategoriesRouter } from "./routers/subjectsSubjectCategories";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  subjectCategories: subjectCategoriesRouter,
  subjects: subjectsRouter,
  subjectsSubjectCategories: subjectsSubjectCategoriesRouter,
});

export type AppRouter = typeof appRouter;
