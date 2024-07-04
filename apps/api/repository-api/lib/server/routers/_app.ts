import { router } from "../server/trpc";
import { repositoriesRouter } from "./repositories";
import { repositoryInstanceConfigsRouter } from "./repositoryInstanceConfigs";
import { repositoryInstancesRouter } from "./repositoryInstances";
import { repositoryOnedriveAccessesRouter } from "./repositoryOnedriveAccesses";

export const appRouter = router({
  repositories: repositoriesRouter,
  repositoryInstances: repositoryInstancesRouter,
  repositoryInstanceConfigs: repositoryInstanceConfigsRouter,
  repositoryOnedriveAccesses: repositoryOnedriveAccessesRouter,
});

export type AppRouter = typeof appRouter;
