import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { commentsRouter } from "./comments";

export const appRouter = router({
  computers: computersRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
