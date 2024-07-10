import { enrolFlatfilesRouter } from './routers/enrolFlatfiles';
import { enrolLtiAppRegistrationsRouter } from './routers/enrolLtiAppRegistrations';
import { enrolLtiContextsRouter } from './routers/enrolLtiContexts';
import { enrolLtiDeploymentsRouter } from './routers/enrolLtiDeployments';
import { enrolLtiLti2ConsumersRouter } from './routers/enrolLtiLti2Consumers';
import { enrolLtiLti2ContextsRouter } from './routers/enrolLtiLti2Contexts';
import { enrolLtiLti2NoncesRouter } from './routers/enrolLtiLti2Nonces';
import { enrolLtiLti2ResourceLinksRouter } from './routers/enrolLtiLti2ResourceLinks';
import { enrolLtiLti2ShareKeysRouter } from './routers/enrolLtiLti2ShareKeys';
import { enrolLtiLti2ToolProxysRouter } from './routers/enrolLtiLti2ToolProxys';
import { enrolLtiLti2UserResultsRouter } from './routers/enrolLtiLti2UserResults';
import { enrolLtiResourceLinksRouter } from './routers/enrolLtiResourceLinks';
import { enrolLtiToolConsumerMapsRouter } from './routers/enrolLtiToolConsumerMaps';
import { enrolLtiToolsRouter } from './routers/enrolLtiTools';
import { enrolLtiUserResourceLinksRouter } from './routers/enrolLtiUserResourceLinks';
import { enrolLtiUsersRouter } from './routers/enrolLtiUsers';
import { enrolPaypalsRouter } from './routers/enrolPaypals';
import { enrolsRouter } from './routers/enrols';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  enrolFlatfiles: enrolFlatfilesRouter,
  enrolLtiAppRegistrations: enrolLtiAppRegistrationsRouter,
  enrolLtiContexts: enrolLtiContextsRouter,
  enrolLtiDeployments: enrolLtiDeploymentsRouter,
  enrolLtiLti2Consumers: enrolLtiLti2ConsumersRouter,
  enrolLtiLti2Contexts: enrolLtiLti2ContextsRouter,
  enrolLtiLti2Nonces: enrolLtiLti2NoncesRouter,
  enrolLtiLti2ResourceLinks: enrolLtiLti2ResourceLinksRouter,
  enrolLtiLti2ShareKeys: enrolLtiLti2ShareKeysRouter,
  enrolLtiLti2ToolProxys: enrolLtiLti2ToolProxysRouter,
  enrolLtiLti2UserResults: enrolLtiLti2UserResultsRouter,
  enrolLtiResourceLinks: enrolLtiResourceLinksRouter,
  enrolLtiToolConsumerMaps: enrolLtiToolConsumerMapsRouter,
  enrolLtiTools: enrolLtiToolsRouter,
  enrolLtiUserResourceLinks: enrolLtiUserResourceLinksRouter,
  enrolLtiUsers: enrolLtiUsersRouter,
  enrolPaypals: enrolPaypalsRouter,
  enrols: enrolsRouter,
});

export type AppRouter = typeof appRouter;
