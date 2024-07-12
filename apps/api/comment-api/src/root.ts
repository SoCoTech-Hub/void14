import { commentsRouter } from "./routers/comments";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
