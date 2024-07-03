import { router } from '@/lib/server/trpc'
import { tagCollsRouter } from './tagColls'
import { tagsRouter } from './tags'
import { tagAreasRouter } from './tagAreas'
import { tagCorrelationsRouter } from './tagCorrelations'
import { tagInstancesRouter } from './tagInstances'

export const appRouter = router({
	tags: tagsRouter,
	tagColls: tagCollsRouter,
	tagAreas: tagAreasRouter,
	tagCorrelations: tagCorrelationsRouter,
	tagInstances: tagInstancesRouter
})

export type AppRouter = typeof appRouter
