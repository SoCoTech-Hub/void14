import { router } from '@/lib/server/trpc'
import { toolMonitorEventsRouter } from './toolMonitorEvents'
import { toolMonitorHistoriesRouter } from './toolMonitorHistories'
import { toolMonitorRulesRouter } from './toolMonitorRules'
import { toolMonitorSubscriptionsRouter } from './toolMonitorSubscriptions'

export const appRouter = router({
	toolMonitorEvents: toolMonitorEventsRouter,
	toolMonitorHistories: toolMonitorHistoriesRouter,
	toolMonitorRules: toolMonitorRulesRouter,
	toolMonitorSubscriptions: toolMonitorSubscriptionsRouter
})

export type AppRouter = typeof appRouter
