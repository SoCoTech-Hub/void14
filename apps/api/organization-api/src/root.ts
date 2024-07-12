import { organizationsRouter } from "./routers/organizations";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
