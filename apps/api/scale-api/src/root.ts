import { scaleHistoriesRouter } from "./routers/scaleHistories";
import { scalesRouter } from "./routers/scales";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  scaleHistories: scaleHistoriesRouter,
  scales: scalesRouter,
});

export type AppRouter = typeof appRouter;
