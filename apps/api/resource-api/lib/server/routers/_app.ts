import { router } from "../server/trpc";
import { resourceOldsRouter } from "./resourceOlds";
import { resourcesRouter } from "./resources";

export const appRouter = router({
  resources: resourcesRouter,
  resourceOlds: resourceOldsRouter,
});

export type AppRouter = typeof appRouter;
