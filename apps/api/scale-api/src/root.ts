import { createTRPCRouter } from "./trpc";

import { scaleHistoriesRouter } from './routers/scaleHistories';
import { scalesRouter } from './routers/scales';

export const appRouter = createTRPCRouter({
  scaleHistories: scaleHistoriesRouter,
  scales: scalesRouter,
});

export type AppRouter = typeof appRouter;
