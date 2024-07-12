import { groupingsRouter } from "./routers/groupings";
import { groupingsGroupsRouter } from "./routers/groupingsGroups";
import { groupsRouter } from "./routers/groups";
import { groupsMembersRouter } from "./routers/groupsMembers";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  groupings: groupingsRouter,
  groupingsGroups: groupingsGroupsRouter,
  groups: groupsRouter,
  groupsMembers: groupsMembersRouter,
});

export type AppRouter = typeof appRouter;
