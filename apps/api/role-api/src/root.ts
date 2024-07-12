import { roleAllowAssignsRouter } from "./routers/roleAllowAssigns";
import { roleAllowOverridesRouter } from "./routers/roleAllowOverrides";
import { roleAllowSwitchesRouter } from "./routers/roleAllowSwitches";
import { roleAllowViewsRouter } from "./routers/roleAllowViews";
import { roleAssignmentsRouter } from "./routers/roleAssignments";
import { roleCapabilitiesRouter } from "./routers/roleCapabilities";
import { roleContextLevelsRouter } from "./routers/roleContextLevels";
import { roleNamesRouter } from "./routers/roleNames";
import { rolesRouter } from "./routers/roles";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  roleAllowAssigns: roleAllowAssignsRouter,
  roleAllowOverrides: roleAllowOverridesRouter,
  roleAllowSwitches: roleAllowSwitchesRouter,
  roleAllowViews: roleAllowViewsRouter,
  roleAssignments: roleAssignmentsRouter,
  roleCapabilities: roleCapabilitiesRouter,
  roleContextLevels: roleContextLevelsRouter,
  roleNames: roleNamesRouter,
  roles: rolesRouter,
});

export type AppRouter = typeof appRouter;
