import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { repositoriesRouter } from "./repositories";
import { repositoryInstancesRouter } from "./repositoryInstances";
import { repositoryInstanceConfigsRouter } from "./repositoryInstanceConfigs";
import { repositoryOnedriveAccessesRouter } from "./repositoryOnedriveAccesses";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  repositories: repositoriesRouter,
  repositoryInstances: repositoryInstancesRouter,
  repositoryInstanceConfigs: repositoryInstanceConfigsRouter,
  repositoryOnedriveAccesses: repositoryOnedriveAccessesRouter,
