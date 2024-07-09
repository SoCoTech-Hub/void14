import { accountRouter } from "./routers/account";
import { blockInstancesRouter } from "./routers/blockInstances";
import { blockPositionsRouter } from "./routers/blockPositions";
import { blockRecentActivitiesRouter } from "./routers/blockRecentActivities";
import { blockRecentlyAccessedItemsRouter } from "./routers/blockRecentlyAccessedItems";
import { blockRssClientsRouter } from "./routers/blockRssClients";
import { blocksRouter } from "./routers/blocks";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  account: accountRouter,
  blockInstances: blockInstancesRouter,
  blockPositions: blockPositionsRouter,
  blockRecentActivities: blockRecentActivitiesRouter,
  blockRecentlyAccessedItems: blockRecentlyAccessedItemsRouter,
  blockRssClients: blockRssClientsRouter,
  blocks: blocksRouter,
});

export type AppRouter = typeof appRouter;
