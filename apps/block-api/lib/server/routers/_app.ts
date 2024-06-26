import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { blocksRouter } from "./blocks";
import { blockInstancesRouter } from "./blockInstances";
import { blockPositionsRouter } from "./blockPositions";
import { blockRecentActivitiesRouter } from "./blockRecentActivities";
import { blockRecentlyAccessedItemsRouter } from "./blockRecentlyAccessedItems";
import { blockRssClientsRouter } from "./blockRssClients";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  blocks: blocksRouter,
  blockInstances: blockInstancesRouter,
  blockPositions: blockPositionsRouter,
  blockRecentActivities: blockRecentActivitiesRouter,
  blockRecentlyAccessedItems: blockRecentlyAccessedItemsRouter,
  blockRssClients: blockRssClientsRouter,
});

export type AppRouter = typeof appRouter;
