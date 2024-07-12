import { organizationsRouter } from "./routers/organizations";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
