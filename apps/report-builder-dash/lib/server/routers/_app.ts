import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { reportbuilderAudiencesRouter } from "./reportbuilderAudiences";
import { reportbuilderColumnsRouter } from "./reportbuilderColumns";
import { reportbuilderFiltersRouter } from "./reportbuilderFilters";
import { reportbuilderReportsRouter } from "./reportbuilderReports";
import { reportbuilderSchedulesRouter } from "./reportbuilderSchedules";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  reportbuilderAudiences: reportbuilderAudiencesRouter,
  reportbuilderColumns: reportbuilderColumnsRouter,
  reportbuilderFilters: reportbuilderFiltersRouter,
  reportbuilderReports: reportbuilderReportsRouter,
  reportbuilderSchedules: reportbuilderSchedulesRouter,
