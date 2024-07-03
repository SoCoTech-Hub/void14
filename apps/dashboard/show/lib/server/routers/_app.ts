import { router } from '@/lib/server/trpc'
import { showsRouter } from './shows'
import { showsCategoriesRouter } from './showsCategories'

export const appRouter = router({
	shows: showsRouter,
	showsCategories: showsCategoriesRouter
})

export type AppRouter = typeof appRouter
