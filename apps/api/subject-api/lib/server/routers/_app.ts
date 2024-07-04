import { router } from "../server/trpc";
import { subjectCategoriesRouter } from "./subjectCategories";
import { subjectsRouter } from "./subjects";
import { subjectsSubjectCategoriesRouter } from "./subjectsSubjectCategories";

export const appRouter = router({
  subjectCategories: subjectCategoriesRouter,
  subjectsSubjectCategories: subjectsSubjectCategoriesRouter,
  subjects: subjectsRouter,
});

export type AppRouter = typeof appRouter;
