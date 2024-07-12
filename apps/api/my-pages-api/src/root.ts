import { myPagesRouter } from "./routers/myPages";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  myPages: myPagesRouter,
});

export type AppRouter = typeof appRouter;
