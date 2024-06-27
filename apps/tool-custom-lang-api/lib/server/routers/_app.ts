import { router } from '@/lib/server/trpc'
import { toolCustomLangsRouter } from './toolCustomLangs'
import { toolCustomLangComponentsRouter } from './toolCustomLangComponents'

export const appRouter = router({
	toolCustomLangs: toolCustomLangsRouter,
	toolCustomLangComponents: toolCustomLangComponentsRouter
})

export type AppRouter = typeof appRouter
