import { router } from '@/lib/server/trpc'
import { quizesRouter } from './quizes'
import { quizAttemptsRouter } from './quizAttempts'
import { quizFeedbacksRouter } from './quizFeedbacks'
import { quizGradesRouter } from './quizGrades'
import { quizOverridesRouter } from './quizOverrides'
import { quizOverviewRegradesRouter } from './quizOverviewRegrades'
import { quizReportsRouter } from './quizReports'
import { quizSectionsRouter } from './quizSections'
import { quizSlotsRouter } from './quizSlots'
import { quizStatisticsRouter } from './quizStatistics'

export const appRouter = router({
	quizes: quizesRouter,
	quizAttempts: quizAttemptsRouter,
	quizFeedbacks: quizFeedbacksRouter,
	quizGrades: quizGradesRouter,
	quizOverrides: quizOverridesRouter,
	quizOverviewRegrades: quizOverviewRegradesRouter,
	quizReports: quizReportsRouter,
	quizSections: quizSectionsRouter,
	quizSlots: quizSlotsRouter,
	quizStatistics: quizStatisticsRouter
})

export type AppRouter = typeof appRouter
