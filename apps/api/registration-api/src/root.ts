import { registrationHubsRouter } from './routers/registrationHubs';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  registrationHubs: registrationHubsRouter,
});

export type AppRouter = typeof appRouter;
