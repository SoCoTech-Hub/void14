import { router } from "../server/trpc";
import { applicationCategoriesRouter } from "./applicationCategories";
import { applicationResponsesRouter } from "./applicationResponses";
import { computersRouter } from "./computers";
import { jobApplicationsRouter } from "./jobApplications";
import { jobApplicationsApplicationCategoriesRouter } from "./jobApplicationsApplicationCategories";

export const appRouter = router({
  computers: computersRouter,
  applicationCategories: applicationCategoriesRouter,
  jobApplications: jobApplicationsRouter,
  applicationResponses: applicationResponsesRouter,
  jobApplicationsApplicationCategories:
    jobApplicationsApplicationCategoriesRouter,
});

export type AppRouter = typeof appRouter;
