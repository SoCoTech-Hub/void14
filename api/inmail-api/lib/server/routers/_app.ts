import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { inmailsRouter } from "./inmails";
import { inmailResponsesRouter } from "./inmailResponses";

export const appRouter = router({
  computers: computersRouter,
  inmails: inmailsRouter,
  inmailResponses: inmailResponsesRouter,
});

export type AppRouter = typeof appRouter;
