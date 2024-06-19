import { router } from '@/lib/server/trpc'
import { ratingsRouter } from './ratings'

export const appRouter = router({
	ratings: ratingsRouter
})

export type AppRouter = typeof appRouter
