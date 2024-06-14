import { router } from '@/lib/server/trpc'
import { scormsRouter } from './scorms'

export const appRouter = router({
	scorms: scormsRouter
})

export type AppRouter = typeof appRouter
