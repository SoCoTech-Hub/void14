import { labelsRouter } from "./routers/labels";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  labels: labelsRouter,
});

export type AppRouter = typeof appRouter;
