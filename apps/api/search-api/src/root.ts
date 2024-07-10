import { searchIndexRequestsRouter } from './routers/searchIndexRequests';
import { searchSimpledbIndexesRouter } from './routers/searchSimpledbIndexes';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  searchIndexRequests: searchIndexRequestsRouter,
  searchSimpledbIndexes: searchSimpledbIndexesRouter,
});

export type AppRouter = typeof appRouter;
