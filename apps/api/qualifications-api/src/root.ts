import { qualificationsRouter } from './routers/qualifications';
import { qualificationsResponsesRouter } from './routers/qualificationsResponses';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  qualifications: qualificationsRouter,
  qualificationsResponses: qualificationsResponsesRouter,
});

export type AppRouter = typeof appRouter;
