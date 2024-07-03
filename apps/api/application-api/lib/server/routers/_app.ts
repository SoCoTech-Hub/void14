import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { applicationCategoriesRouter } from "./applicationCategories";
import { jobApplicationsRouter } from "./jobApplications";
import { applicationResponsesRouter } from "./applicationResponses";
import { jobApplicationsApplicationCategoriesRouter } from "./jobApplicationsApplicationCategories";

export const appRouter = router({
  computers: computersRouter,
  applicationCategories: applicationCategoriesRouter,
  jobApplications: jobApplicationsRouter,
  applicationResponses: applicationResponsesRouter,
  jobApplicationsApplicationCategories: jobApplicationsApplicationCategoriesRouter,
});

export type AppRouter = typeof appRouter;
