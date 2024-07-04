import { computersRouter } from './computers'
import { router } from '../server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { logDisplaysRouter } from "./logDisplays";
import { logQueriesRouter } from "./logQueries";
import { logstoreStandardLogsRouter } from "./logstoreStandardLogs";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  logDisplays: logDisplaysRouter,
  logQueries: logQueriesRouter,
  logstoreStandardLogs: logstoreStandardLogsRouter,
