import { router } from '@/lib/server/trpc'
import { toolDataprivacyCategoriesRouter } from './toolDataprivacyCategories'
import { toolDataprivacyCtxExpiredsRouter } from './toolDataprivacyCtxExpireds'
import { toolDataprivacyCtxInstancesRouter } from './toolDataprivacyCtxInstances'
import { toolDataprivacyCtxLevelsRouter } from './toolDataprivacyCtxLevels'
import { toolDataprivacyPurposesRouter } from './toolDataprivacyPurposes'
import { toolDataprivacyPurposeRolesRouter } from './toolDataprivacyPurposeRoles'
import { toolDataprivacyRequestsRouter } from './toolDataprivacyRequests'

export const appRouter = router({
	toolDataprivacyCategories: toolDataprivacyCategoriesRouter,
	toolDataprivacyCtxExpireds: toolDataprivacyCtxExpiredsRouter,
	toolDataprivacyCtxInstances: toolDataprivacyCtxInstancesRouter,
	toolDataprivacyCtxLevels: toolDataprivacyCtxLevelsRouter,
	toolDataprivacyPurposes: toolDataprivacyPurposesRouter,
	toolDataprivacyPurposeRoles: toolDataprivacyPurposeRolesRouter,
	toolDataprivacyRequests: toolDataprivacyRequestsRouter
})

export type AppRouter = typeof appRouter
