import { searchIndexRequestsRouter } from "./routers/searchIndexRequests";
import { searchSimpledbIndexesRouter } from "./routers/searchSimpledbIndexes";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  searchIndexRequests: searchIndexRequestsRouter,
  searchSimpledbIndexes: searchSimpledbIndexesRouter,
});

export type AppRouter = typeof appRouter;
