import { router } from '@/lib/server/trpc'
import { filterActivesRouter } from './filterActives'
import { filterConfigsRouter } from './filterConfigs'

export const appRouter = router({
	filterActives: filterActivesRouter,
	filterConfigs: filterConfigsRouter
})

export type AppRouter = typeof appRouter
