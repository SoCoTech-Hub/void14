import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { mediasRouter } from "./medias";

export const appRouter = router({
  computers: computersRouter,
  medias: mediasRouter,
});

export type AppRouter = typeof appRouter;
