import { computersRouter } from './computers'
import { router } from '../server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { h5psRouter } from "./h5ps";
import { h5pContentsLibrariesRouter } from "./h5pContentsLibraries";
import { h5pLibrariesRouter } from "./h5pLibraries";
import { h5pLibrariesCachedassetsRouter } from "./h5pLibrariesCachedassets";
import { h5pLibraryDependenciesRouter } from "./h5pLibraryDependencies";
import { h5pactivitiesRouter } from "./h5pactivities";
import { h5pactivityAttemptsRouter } from "./h5pactivityAttempts";
import { h5pactivityAttemptsResultsRouter } from "./h5pactivityAttemptsResults";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  h5ps: h5psRouter,
  h5pContentsLibraries: h5pContentsLibrariesRouter,
  h5pLibraries: h5pLibrariesRouter,
  h5pLibrariesCachedassets: h5pLibrariesCachedassetsRouter,
  h5pLibraryDependencies: h5pLibraryDependenciesRouter,
  h5pactivities: h5pactivitiesRouter,
  h5pactivityAttempts: h5pactivityAttemptsRouter,
  h5pactivityAttemptsResults: h5pactivityAttemptsResultsRouter,
