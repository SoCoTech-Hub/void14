import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { quizesRouter } from "./quizes";
import { quizAttemptsRouter } from "./quizAttempts";
import { quizFeedbacksRouter } from "./quizFeedbacks";
import { quizGradesRouter } from "./quizGrades";
import { quizOverridesRouter } from "./quizOverrides";
import { quizOverviewRegradesRouter } from "./quizOverviewRegrades";
import { quizReportsRouter } from "./quizReports";
import { quizSectionsRouter } from "./quizSections";
import { quizSlotsRouter } from "./quizSlots";
import { quizStatisticsRouter } from "./quizStatistics";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  quizes: quizesRouter,
  quizAttempts: quizAttemptsRouter,
  quizFeedbacks: quizFeedbacksRouter,
  quizGrades: quizGradesRouter,
  quizOverrides: quizOverridesRouter,
  quizOverviewRegrades: quizOverviewRegradesRouter,
  quizReports: quizReportsRouter,
  quizSections: quizSectionsRouter,
  quizSlots: quizSlotsRouter,
  quizStatistics: quizStatisticsRouter,
