import { licensesRouter } from "./routers/licenses";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  licenses: licensesRouter,
});

export type AppRouter = typeof appRouter;
