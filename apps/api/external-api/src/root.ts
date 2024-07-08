import { createTRPCRouter } from "./trpc";

import { externalFunctionsRouter } from './routers/externalFunctions';
import { externalServicesRouter } from './routers/externalServices';
import { externalServicesFunctionsRouter } from './routers/externalServicesFunctions';
import { externalServicesUsersRouter } from './routers/externalServicesUsers';
import { externalTokensRouter } from './routers/externalTokens';

export const appRouter = createTRPCRouter({
  externalFunctions: externalFunctionsRouter,
  externalServices: externalServicesRouter,
  externalServicesFunctions: externalServicesFunctionsRouter,
  externalServicesUsers: externalServicesUsersRouter,
  externalTokens: externalTokensRouter,
});

export type AppRouter = typeof appRouter;
