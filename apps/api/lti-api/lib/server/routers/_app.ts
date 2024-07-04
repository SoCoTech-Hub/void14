import { computersRouter } from './computers'
import { router } from '../server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { ltiAccessTokensRouter } from "./ltiAccessTokens";
import { ltiSubmissionsRouter } from "./ltiSubmissions";
import { ltisRouter } from "./ltis";
import { ltiToolProxiesRouter } from "./ltiToolProxies";
import { ltiToolSettingsRouter } from "./ltiToolSettings";
import { ltiTypesRouter } from "./ltiTypes";
import { ltiTypesConfigsRouter } from "./ltiTypesConfigs";
import { ltiserviceGradebookservicesRouter } from "./ltiserviceGradebookservices";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  ltiAccessTokens: ltiAccessTokensRouter,
  ltiSubmissions: ltiSubmissionsRouter,
  ltis: ltisRouter,
  ltiToolProxies: ltiToolProxiesRouter,
  ltiToolSettings: ltiToolSettingsRouter,
  ltiTypes: ltiTypesRouter,
  ltiTypesConfigs: ltiTypesConfigsRouter,
  ltiserviceGradebookservices: ltiserviceGradebookservicesRouter,
