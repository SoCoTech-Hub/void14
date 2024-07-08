import { createTRPCRouter } from "./trpc";

import { qualificationsRouter } from './routers/qualifications';
import { qualificationsResponsesRouter } from './routers/qualificationsResponses';

export const appRouter = createTRPCRouter({
  qualifications: qualificationsRouter,
  qualificationsResponses: qualificationsResponsesRouter,
});

export type AppRouter = typeof appRouter;
