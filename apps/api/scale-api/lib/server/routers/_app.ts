import { router } from "../server/trpc";
import { scaleHistoriesRouter } from "./scaleHistories";
import { scalesRouter } from "./scales";

export const appRouter = router({
  scales: scalesRouter,
  scaleHistories: scaleHistoriesRouter,
});

export type AppRouter = typeof appRouter;
