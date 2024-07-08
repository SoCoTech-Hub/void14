import { createTRPCRouter } from "./trpc";

import { reportbuilderAudiencesRouter } from './routers/reportbuilderAudiences';
import { reportbuilderColumnsRouter } from './routers/reportbuilderColumns';
import { reportbuilderFiltersRouter } from './routers/reportbuilderFilters';
import { reportbuilderReportsRouter } from './routers/reportbuilderReports';
import { reportbuilderSchedulesRouter } from './routers/reportbuilderSchedules';

export const appRouter = createTRPCRouter({
  reportbuilderAudiences: reportbuilderAudiencesRouter,
  reportbuilderColumns: reportbuilderColumnsRouter,
  reportbuilderFilters: reportbuilderFiltersRouter,
  reportbuilderReports: reportbuilderReportsRouter,
  reportbuilderSchedules: reportbuilderSchedulesRouter,
});

export type AppRouter = typeof appRouter;
