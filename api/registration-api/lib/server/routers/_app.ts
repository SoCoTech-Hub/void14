import { router } from '@/lib/server/trpc'
import { registrationHubsRouter } from './registrationHubs'

export const appRouter = router({
	registrationHubs: registrationHubsRouter
})

export type AppRouter = typeof appRouter
