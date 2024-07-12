import { registrationHubsRouter } from "./routers/registrationHubs";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  registrationHubs: registrationHubsRouter,
});

export type AppRouter = typeof appRouter;
