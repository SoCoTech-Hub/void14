import { stickersRouter } from "./routers/stickers";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  stickers: stickersRouter,
});

export type AppRouter = typeof appRouter;
