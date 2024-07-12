import { licensesRouter } from "./routers/licenses";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  licenses: licensesRouter,
});

export type AppRouter = typeof appRouter;
