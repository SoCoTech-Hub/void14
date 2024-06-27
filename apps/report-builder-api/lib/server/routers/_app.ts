import { router } from '@/lib/server/trpc'
import { reportbuilderAudiencesRouter } from './reportbuilderAudiences'
import { reportbuilderColumnsRouter } from './reportbuilderColumns'
import { reportbuilderFiltersRouter } from './reportbuilderFilters'
import { reportbuilderReportsRouter } from './reportbuilderReports'
import { reportbuilderSchedulesRouter } from './reportbuilderSchedules'

export const appRouter = router({
	reportbuilderAudiences: reportbuilderAudiencesRouter,
	reportbuilderColumns: reportbuilderColumnsRouter,
	reportbuilderFilters: reportbuilderFiltersRouter,
	reportbuilderReports: reportbuilderReportsRouter,
	reportbuilderSchedules: reportbuilderSchedulesRouter
})

export type AppRouter = typeof appRouter
