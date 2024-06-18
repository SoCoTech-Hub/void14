import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { quizaccessSebTemplatesRouter } from "./quizaccessSebTemplates";
import { quizaccessSebQuizSettingsRouter } from "./quizaccessSebQuizSettings";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  quizaccessSebTemplates: quizaccessSebTemplatesRouter,
  quizaccessSebQuizSettings: quizaccessSebQuizSettingsRouter,
