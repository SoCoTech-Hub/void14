import { router } from '@/lib/server/trpc'
import { scalesRouter } from './scales'
import { scaleHistoriesRouter } from './scaleHistories'

export const appRouter = router({
	scales: scalesRouter,
	scaleHistories: scaleHistoriesRouter
})

export type AppRouter = typeof appRouter
