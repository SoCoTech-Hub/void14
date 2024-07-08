import { createTRPCRouter } from "./trpc";

import { toolUserToursStepsRouter } from './routers/toolUserToursSteps';
import { toolUserToursToursRouter } from './routers/toolUserToursTours';

export const appRouter = createTRPCRouter({
  toolUserToursSteps: toolUserToursStepsRouter,
  toolUserToursTours: toolUserToursToursRouter,
});

export type AppRouter = typeof appRouter;
