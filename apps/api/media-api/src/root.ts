import { mediasRouter } from "./routers/medias";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  medias: mediasRouter,
});

export type AppRouter = typeof appRouter;
