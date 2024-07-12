import { myPagesRouter } from "./routers/myPages";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  myPages: myPagesRouter,
});

export type AppRouter = typeof appRouter;
