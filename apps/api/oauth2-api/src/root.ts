import { createTRPCRouter } from "./trpc";

import { oauth2AccessTokensRouter } from './routers/oauth2AccessTokens';
import { oauth2EndpointsRouter } from './routers/oauth2Endpoints';
import { oauth2IssuersRouter } from './routers/oauth2Issuers';
import { oauth2RefreshTokensRouter } from './routers/oauth2RefreshTokens';
import { oauth2SystemAccountsRouter } from './routers/oauth2SystemAccounts';
import { oauth2UserFieldMappingsRouter } from './routers/oauth2UserFieldMappings';

export const appRouter = createTRPCRouter({
  oauth2AccessTokens: oauth2AccessTokensRouter,
  oauth2Endpoints: oauth2EndpointsRouter,
  oauth2Issuers: oauth2IssuersRouter,
  oauth2RefreshTokens: oauth2RefreshTokensRouter,
  oauth2SystemAccounts: oauth2SystemAccountsRouter,
  oauth2UserFieldMappings: oauth2UserFieldMappingsRouter,
});

export type AppRouter = typeof appRouter;
