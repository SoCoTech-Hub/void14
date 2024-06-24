import { router } from '@/lib/server/trpc'
import { resourcesRouter } from './resources'
import { resourceOldsRouter } from './resourceOlds'

export const appRouter = router({
	resources: resourcesRouter,
	resourceOlds: resourceOldsRouter
})

export type AppRouter = typeof appRouter
