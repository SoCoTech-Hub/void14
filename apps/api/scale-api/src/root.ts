import { scaleHistoriesRouter } from './routers/scaleHistories';
import { scalesRouter } from './routers/scales';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  scaleHistories: scaleHistoriesRouter,
  scales: scalesRouter,
});

export type AppRouter = typeof appRouter;
