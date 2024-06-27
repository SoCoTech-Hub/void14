import { router } from '@/lib/server/trpc'
import { sessionsRouter } from './sessions'

export const appRouter = router({
	sessions: sessionsRouter
})

export type AppRouter = typeof appRouter
