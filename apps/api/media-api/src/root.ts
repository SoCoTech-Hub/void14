import { mediasRouter } from "./routers/medias";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  medias: mediasRouter,
});

export type AppRouter = typeof appRouter;
