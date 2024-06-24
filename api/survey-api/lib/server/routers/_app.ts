import { router } from '@/lib/server/trpc'
import { surveysRouter } from './surveys'
import { surveyAnalysissRouter } from './surveyAnalysiss'
import { surveyAnswersRouter } from './surveyAnswers'
import { surveyQuestionsRouter } from './surveyQuestions'

export const appRouter = router({
	surveys: surveysRouter,
	surveyAnalysiss: surveyAnalysissRouter,
	surveyAnswers: surveyAnswersRouter,
	surveyQuestions: surveyQuestionsRouter
})

export type AppRouter = typeof appRouter
