import { router } from "../server/trpc";
import { commentsRouter } from "./comments";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
