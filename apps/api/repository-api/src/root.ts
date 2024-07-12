import { repositoriesRouter } from "./routers/repositories";
import { repositoryInstanceConfigsRouter } from "./routers/repositoryInstanceConfigs";
import { repositoryInstancesRouter } from "./routers/repositoryInstances";
import { repositoryOnedriveAccessesRouter } from "./routers/repositoryOnedriveAccesses";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  repositories: repositoriesRouter,
  repositoryInstanceConfigs: repositoryInstanceConfigsRouter,
  repositoryInstances: repositoryInstancesRouter,
  repositoryOnedriveAccesses: repositoryOnedriveAccessesRouter,
});

export type AppRouter = typeof appRouter;
