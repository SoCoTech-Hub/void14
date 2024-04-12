import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { subjectCategoriesRouter } from "./subjectCategories";
import { subjectsRouter } from "./subjects";
import { subjectsSubjectCategoriesRouter } from "./subjectsSubjectCategories";

export const appRouter = router({
  computers: computersRouter,
  subjectCategories: subjectCategoriesRouter,
  subjects: subjectsRouter,
  subjectsSubjectCategories: subjectsSubjectCategoriesRouter,
});

export type AppRouter = typeof appRouter;
