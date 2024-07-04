import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { inmailResponsesRouter } from "./inmailResponses";
import { inmailsRouter } from "./inmails";

export const appRouter = router({
  computers: computersRouter,
  inmails: inmailsRouter,
  inmailResponses: inmailResponsesRouter,
});

export type AppRouter = typeof appRouter;
