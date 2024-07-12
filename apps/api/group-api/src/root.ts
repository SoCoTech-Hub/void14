import { groupingsRouter } from "./routers/groupings";
import { groupingsGroupsRouter } from "./routers/groupingsGroups";
import { groupsRouter } from "./routers/groups";
import { groupsMembersRouter } from "./routers/groupsMembers";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  groupings: groupingsRouter,
  groupingsGroups: groupingsGroupsRouter,
  groups: groupsRouter,
  groupsMembers: groupsMembersRouter,
});

export type AppRouter = typeof appRouter;
