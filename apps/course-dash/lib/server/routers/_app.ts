import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { courseCategoriesRouter } from "./courseCategories";
import { coursesRouter } from "./courses";
import { courseCompletionCritComplsRouter } from "./courseCompletionCritCompls";
import { courseCompletionCriteriasRouter } from "./courseCompletionCriterias";
import { courseCompletionDefaultsRouter } from "./courseCompletionDefaults";
import { courseCompletionsRouter } from "./courseCompletions";
import { courseFormatOptionsRouter } from "./courseFormatOptions";
import { courseModulesRouter } from "./courseModules";
import { courseModulesCompletionsRouter } from "./courseModulesCompletions";
import { coursePublishesRouter } from "./coursePublishes";
import { courseRequestsRouter } from "./courseRequests";
import { courseSectionsRouter } from "./courseSections";

export const appRouter = router({
  computers: computersRouter,
  courseCategories: courseCategoriesRouter,
  courses: coursesRouter,
  courseCompletionCritCompls: courseCompletionCritComplsRouter,
  courseCompletionCriterias: courseCompletionCriteriasRouter,
  courseCompletionDefaults: courseCompletionDefaultsRouter,
  courseCompletions: courseCompletionsRouter,
  courseFormatOptions: courseFormatOptionsRouter,
  courseModules: courseModulesRouter,
  courseModulesCompletions: courseModulesCompletionsRouter,
  coursePublishes: coursePublishesRouter,
  courseRequests: courseRequestsRouter,
  courseSections: courseSectionsRouter,
});

export type AppRouter = typeof appRouter;
