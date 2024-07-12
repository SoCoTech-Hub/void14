import { courseCategoriesRouter } from "./routers/courseCategories";
import { courseCompletionAggrMethdsRouter } from "./routers/courseCompletionAggrMethds";
import { courseCompletionCritComplsRouter } from "./routers/courseCompletionCritCompls";
import { courseCompletionCriteriasRouter } from "./routers/courseCompletionCriterias";
import { courseCompletionDefaultsRouter } from "./routers/courseCompletionDefaults";
import { courseCompletionsRouter } from "./routers/courseCompletions";
import { courseFormatOptionsRouter } from "./routers/courseFormatOptions";
import { courseModulesRouter } from "./routers/courseModules";
import { courseModulesCompletionsRouter } from "./routers/courseModulesCompletions";
import { coursePublishesRouter } from "./routers/coursePublishes";
import { courseRequestsRouter } from "./routers/courseRequests";
import { coursesRouter } from "./routers/courses";
import { courseSectionsRouter } from "./routers/courseSections";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  courseCategories: courseCategoriesRouter,
  courseCompletionAggrMethds: courseCompletionAggrMethdsRouter,
  courseCompletionCritCompls: courseCompletionCritComplsRouter,
  courseCompletionCriterias: courseCompletionCriteriasRouter,
  courseCompletionDefaults: courseCompletionDefaultsRouter,
  courseCompletions: courseCompletionsRouter,
  courseFormatOptions: courseFormatOptionsRouter,
  courseModules: courseModulesRouter,
  courseModulesCompletions: courseModulesCompletionsRouter,
  coursePublishes: coursePublishesRouter,
  courseRequests: courseRequestsRouter,
  courses: coursesRouter,
  courseSections: courseSectionsRouter,
});

export type AppRouter = typeof appRouter;
