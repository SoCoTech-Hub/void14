import { router } from "../server/trpc";
import { searchIndexRequestsRouter } from "./searchIndexRequests";
import { searchSimpledbIndexesRouter } from "./searchSimpledbIndexes";

export const appRouter = router({
  searchIndexRequests: searchIndexRequestsRouter,
  searchSimpledbIndexes: searchSimpledbIndexesRouter,
});

export type AppRouter = typeof appRouter;
