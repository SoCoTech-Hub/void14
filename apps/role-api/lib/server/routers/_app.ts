import { router } from '@/lib/server/trpc'
import { rolesRouter } from './roles'
import { roleAllowAssignsRouter } from './roleAllowAssigns'
import { roleAllowOverridesRouter } from './roleAllowOverrides'
import { roleAllowSwitchesRouter } from './roleAllowSwitches'
import { roleAllowViewsRouter } from './roleAllowViews'
import { roleAssignmentsRouter } from './roleAssignments'
import { roleCapabilitiesRouter } from './roleCapabilities'
import { roleContextLevelsRouter } from './roleContextLevels'
import { roleNamesRouter } from './roleNames'

export const appRouter = router({
	roles: rolesRouter,
	roleAllowAssigns: roleAllowAssignsRouter,
	roleAllowOverrides: roleAllowOverridesRouter,
	roleAllowSwitches: roleAllowSwitchesRouter,
	roleAllowViews: roleAllowViewsRouter,
	roleAssignments: roleAssignmentsRouter,
	roleCapabilities: roleCapabilitiesRouter,
	roleContextLevels: roleContextLevelsRouter,
	roleNames: roleNamesRouter
})

export type AppRouter = typeof appRouter
