import { router } from '@/lib/server/trpc'
import { quizaccessSebTemplatesRouter } from './quizaccessSebTemplates'
import { quizaccessSebQuizSettingsRouter } from './quizaccessSebQuizSettings'

export const appRouter = router({
	quizaccessSebTemplates: quizaccessSebTemplatesRouter,
	quizaccessSebQuizSettings: quizaccessSebQuizSettingsRouter
})

export type AppRouter = typeof appRouter
