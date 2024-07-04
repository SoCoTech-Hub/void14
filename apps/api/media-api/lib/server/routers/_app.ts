import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { mediasRouter } from "./medias";

export const appRouter = router({
  computers: computersRouter,
  medias: mediasRouter,
});

export type AppRouter = typeof appRouter;
