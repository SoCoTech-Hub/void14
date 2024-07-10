import { ltiAccessTokensRouter } from './routers/ltiAccessTokens';
import { ltisRouter } from './routers/ltis';
import { ltiserviceGradebookservicesRouter } from './routers/ltiserviceGradebookservices';
import { ltiSubmissionsRouter } from './routers/ltiSubmissions';
import { ltiToolProxiesRouter } from './routers/ltiToolProxies';
import { ltiToolSettingsRouter } from './routers/ltiToolSettings';
import { ltiTypesRouter } from './routers/ltiTypes';
import { ltiTypesConfigsRouter } from './routers/ltiTypesConfigs';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  ltiAccessTokens: ltiAccessTokensRouter,
  ltis: ltisRouter,
  ltiserviceGradebookservices: ltiserviceGradebookservicesRouter,
  ltiSubmissions: ltiSubmissionsRouter,
  ltiToolProxies: ltiToolProxiesRouter,
  ltiToolSettings: ltiToolSettingsRouter,
  ltiTypes: ltiTypesRouter,
  ltiTypesConfigs: ltiTypesConfigsRouter,
});

export type AppRouter = typeof appRouter;
