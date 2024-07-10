import { portfolioInstanceConfigsRouter } from './routers/portfolioInstanceConfigs';
import { portfolioInstancesRouter } from './routers/portfolioInstances';
import { portfolioInstanceUsersRouter } from './routers/portfolioInstanceUsers';
import { portfolioLogsRouter } from './routers/portfolioLogs';
import { portfolioMaharaQueuesRouter } from './routers/portfolioMaharaQueues';
import { portfolioTempdatasRouter } from './routers/portfolioTempdatas';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  portfolioInstanceConfigs: portfolioInstanceConfigsRouter,
  portfolioInstances: portfolioInstancesRouter,
  portfolioInstanceUsers: portfolioInstanceUsersRouter,
  portfolioLogs: portfolioLogsRouter,
  portfolioMaharaQueues: portfolioMaharaQueuesRouter,
  portfolioTempdatas: portfolioTempdatasRouter,
});

export type AppRouter = typeof appRouter;
