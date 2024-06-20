import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { oauth2IssuersRouter } from "./oauth2Issuers";
import { oauth2AccessTokensRouter } from "./oauth2AccessTokens";
import { oauth2EndpointsRouter } from "./oauth2Endpoints";
import { oauth2RefreshTokensRouter } from "./oauth2RefreshTokens";
import { oauth2SystemAccountsRouter } from "./oauth2SystemAccounts";
import { oauth2UserFieldMappingsRouter } from "./oauth2UserFieldMappings";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  oauth2Issuers: oauth2IssuersRouter,
  oauth2AccessTokens: oauth2AccessTokensRouter,
  oauth2Endpoints: oauth2EndpointsRouter,
  oauth2RefreshTokens: oauth2RefreshTokensRouter,
  oauth2SystemAccounts: oauth2SystemAccountsRouter,
  oauth2UserFieldMappings: oauth2UserFieldMappingsRouter,
