import { createTRPCRouter } from "./trpc";

import { registrationHubsRouter } from './routers/registrationHubs';

export const appRouter = createTRPCRouter({
  registrationHubs: registrationHubsRouter,
});

export type AppRouter = typeof appRouter;
