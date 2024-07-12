import { imscpsRouter } from "./routers/imscps";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  imscps: imscpsRouter,
});

export type AppRouter = typeof appRouter;
