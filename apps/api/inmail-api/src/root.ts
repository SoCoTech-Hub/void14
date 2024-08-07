import { inmailResponsesRouter } from "./routers/inmailResponses";
import { inmailsRouter } from "./routers/inmails";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  inmailResponses: inmailResponsesRouter,
  inmails: inmailsRouter,
});

export type AppRouter = typeof appRouter;
