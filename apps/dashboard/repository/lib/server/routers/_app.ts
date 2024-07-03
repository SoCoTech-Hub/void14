import { router } from '@/lib/server/trpc'
import { repositoriesRouter } from './repositories'
import { repositoryInstancesRouter } from './repositoryInstances'
import { repositoryInstanceConfigsRouter } from './repositoryInstanceConfigs'
import { repositoryOnedriveAccessesRouter } from './repositoryOnedriveAccesses'

export const appRouter = router({
	repositories: repositoriesRouter,
	repositoryInstances: repositoryInstancesRouter,
	repositoryInstanceConfigs: repositoryInstanceConfigsRouter,
	repositoryOnedriveAccesses: repositoryOnedriveAccessesRouter
})

export type AppRouter = typeof appRouter
