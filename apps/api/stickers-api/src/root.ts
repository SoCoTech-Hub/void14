import { stickersRouter } from "./routers/stickers";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  stickers: stickersRouter,
});

export type AppRouter = typeof appRouter;
