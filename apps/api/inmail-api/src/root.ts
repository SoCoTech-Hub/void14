import { createTRPCRouter } from "./trpc";

import { inmailResponsesRouter } from './routers/inmailResponses';
import { inmailsRouter } from './routers/inmails';

export const appRouter = createTRPCRouter({
  inmailResponses: inmailResponsesRouter,
  inmails: inmailsRouter,
});

export type AppRouter = typeof appRouter;
