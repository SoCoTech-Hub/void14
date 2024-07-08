import { createTRPCRouter } from "./trpc";

import { applicationCategoriesRouter } from './routers/applicationCategories';
import { applicationResponsesRouter } from './routers/applicationResponses';
import { jobApplicationsRouter } from './routers/jobApplications';
import { jobApplicationsApplicationCategoriesRouter } from './routers/jobApplicationsApplicationCategories';

export const appRouter = createTRPCRouter({
  applicationCategories: applicationCategoriesRouter,
  applicationResponses: applicationResponsesRouter,
  jobApplications: jobApplicationsRouter,
  jobApplicationsApplicationCategories: jobApplicationsApplicationCategoriesRouter,
});

export type AppRouter = typeof appRouter;
