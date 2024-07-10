import { imscpsRouter } from './routers/imscps';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  imscps: imscpsRouter,
});

export type AppRouter = typeof appRouter;
