import { createTRPCRouter } from "./trpc";

import { searchIndexRequestsRouter } from './routers/searchIndexRequests';
import { searchSimpledbIndexesRouter } from './routers/searchSimpledbIndexes';

export const appRouter = createTRPCRouter({
  searchIndexRequests: searchIndexRequestsRouter,
  searchSimpledbIndexes: searchSimpledbIndexesRouter,
});

export type AppRouter = typeof appRouter;
