import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { paymentAccountsRouter } from "./paymentAccounts";
import { paymentsRouter } from "./payments";
import { paymentGatewaysRouter } from "./paymentGateways";
import { paygwPaypalsRouter } from "./paygwPaypals";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  paymentAccounts: paymentAccountsRouter,
  payments: paymentsRouter,
  paymentGateways: paymentGatewaysRouter,
  paygwPaypals: paygwPaypalsRouter,
