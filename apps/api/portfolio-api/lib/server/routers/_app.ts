import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { portfolioInstancesRouter } from "./portfolioInstances";
import { portfolioInstanceConfigsRouter } from "./portfolioInstanceConfigs";
import { portfolioInstanceUsersRouter } from "./portfolioInstanceUsers";
import { portfolioTempdatasRouter } from "./portfolioTempdatas";
import { portfolioLogsRouter } from "./portfolioLogs";
import { portfolioMaharaQueuesRouter } from "./portfolioMaharaQueues";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  portfolioInstances: portfolioInstancesRouter,
  portfolioInstanceConfigs: portfolioInstanceConfigsRouter,
  portfolioInstanceUsers: portfolioInstanceUsersRouter,
  portfolioTempdatas: portfolioTempdatasRouter,
  portfolioLogs: portfolioLogsRouter,
  portfolioMaharaQueues: portfolioMaharaQueuesRouter,
