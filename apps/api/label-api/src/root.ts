import { labelsRouter } from "./routers/labels";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  labels: labelsRouter,
});

export type AppRouter = typeof appRouter;
